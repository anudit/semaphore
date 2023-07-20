#!/usr/bin/env node

/**
 * @module @semaphore-protocol/cli
 * @version 3.10.1
 * @file A command line tool to set up your Semaphore project and get group data.
 * @copyright Ethereum Foundation 2022
 * @license MIT
 * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/cli}
*/

import { SemaphoreSubgraph, SemaphoreEthers, getSupportedNetworks } from '@semaphore-protocol/data';
import chalk from 'chalk';
import { program } from 'commander';
import figlet from 'figlet';
import { readFileSync, existsSync, unlinkSync, copyFileSync } from 'fs';
import logSymbols from 'log-symbols';
import pacote from 'pacote';
import decompress from 'decompress';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import boxen from 'boxen';
import { execSync } from 'child_process';
import { lt } from 'semver';
import ora from 'ora';
import inquirer from 'inquirer';

const cliRegistryURL = "https://registry.npmjs.org/-/package/@semaphore-protocol/cli/dist-tags";
/**
 * Checks the registry directly via the API, if that fails, tries the slower `npm view [package] version` command.
 * This is important for users in environments where direct access to npm is blocked by a firewall, and packages are
 * provided exclusively via a private registry.
 * @param currentVersion The current version of the CLI.
 */
async function checkLatestVersion(currentVersion) {
    let latestVersion;
    try {
        const { data } = await axios.get(cliRegistryURL);
        latestVersion = data.latest;
    }
    catch {
        try {
            latestVersion = execSync("npm view @semaphore-protocol/cli version").toString().trim();
        }
        catch {
            latestVersion = null;
        }
    }
    if (latestVersion && lt(currentVersion, latestVersion)) {
        console.info("\n");
        console.info(boxen(chalk.white(`Update available ${chalk.gray(currentVersion)} -> ${chalk.green(latestVersion)} \n\n You are currently using @semaphore-protocol/cli ${chalk.gray(currentVersion)} which is behind the latest release ${chalk.green(latestVersion)} \n\n Run ${chalk.cyan("npm install -g @semaphore-protocol/cli@latest")} to get the latest version`), { padding: 1, borderColor: "yellow", textAlignment: "center" }));
        console.info("");
    }
}

class Spinner {
    constructor(text) {
        this.text = text;
    }
    start() {
        console.info("");
        this.ora = ora({
            text: this.text,
            indent: 1
        }).start();
    }
    stop() {
        this.ora.stop();
        process.stdout.moveCursor(0, -1);
    }
}

/**
 * Gets all group ids on the specified network
 * @param network The specified network
 */
async function getGroupIds(network) {
    let groupIds;
    const spinner = new Spinner("Fetching groups");
    spinner.start();
    try {
        const semaphoreSubgraph = new SemaphoreSubgraph(network);
        groupIds = await semaphoreSubgraph.getGroupIds();
        spinner.stop();
    }
    catch {
        try {
            const semaphoreEthers = new SemaphoreEthers(network);
            groupIds = await semaphoreEthers.getGroupIds();
            spinner.stop();
        }
        catch {
            spinner.stop();
            console.info(`\n ${logSymbols.error}`, "error: unexpected error with the SemaphoreEthers package");
            return null;
        }
    }
    if (groupIds.length === 0) {
        console.info(`\n ${logSymbols.info}`, "info: there are no groups in this network\n");
        return null;
    }
    return groupIds;
}

async function getProjectName() {
    const { projectName } = await inquirer.prompt({
        name: "projectName",
        type: "input",
        message: "What is your project name?",
        default: "my-app"
    });
    return projectName;
}
async function getSupportedTemplate(supportedTemplates) {
    const { selectedTemplate } = await inquirer.prompt({
        name: "selectedTemplate",
        type: "list",
        message: "Select one of the supported templates:",
        default: 0,
        choices: supportedTemplates.map((template) => ({
            value: template.value,
            name: `${template.value} (${template.name})`
        }))
    });
    return selectedTemplate;
}
async function getSupportedNetwork(supportedNetworks) {
    const { selectedNetwork } = await inquirer.prompt({
        name: "selectedNetwork",
        type: "list",
        message: "Select one of the supported networks:",
        default: 0,
        choices: supportedNetworks
    });
    return selectedNetwork;
}
async function getGroupId(groupIds) {
    const { selectedGroupId } = await inquirer.prompt({
        name: "selectedGroupId",
        type: "list",
        message: "Select one of the following existing group ids:",
        default: 0,
        choices: groupIds
    });
    return selectedGroupId;
}

const packagePath = `${dirname(fileURLToPath(import.meta.url))}/..`;
const { description, version } = JSON.parse(readFileSync(`${packagePath}/package.json`, "utf8"));
const supportedNetworks = getSupportedNetworks();
const supportedTemplates = [
    {
        value: "monorepo-ethers",
        name: "Hardhat + Next.js + SemaphoreEthers"
    },
    {
        value: "monorepo-subgraph",
        name: "Hardhat + Next.js + SemaphoreSubgraph"
    },
    {
        value: "contracts-hardhat",
        name: "Hardhat"
    }
];
program
    .name("semaphore")
    .description(description)
    .version(version, "-v, --version", "Show Semaphore CLI version.")
    .addHelpText("before", `${figlet.textSync("Semaphore")}\n`)
    .addHelpText("after", "\r")
    .helpOption(undefined, "Display this help.")
    .addHelpCommand("help [command]", "Display help for a specific command.")
    .configureOutput({
    outputError: (message) => {
        console.info(`\n ${logSymbols.error}`, message);
    }
});
program
    .command("create")
    .description("Create a Semaphore project with a supported template.")
    .argument("[project-directory]", "Directory of the project.")
    .option("-t, --template <template-name>", "Supported Semaphore template.")
    .allowExcessArguments(false)
    .action(async (projectDirectory, { template }) => {
    if (!projectDirectory) {
        projectDirectory = await getProjectName();
    }
    if (!template) {
        template = await getSupportedTemplate(supportedTemplates);
    }
    if (!supportedTemplates.some((t) => t.value === template)) {
        console.info(`\n ${logSymbols.error}`, `error: the template '${template}' is not supported\n`);
        return;
    }
    const currentDirectory = process.cwd();
    const spinner = new Spinner(`Creating your project in ${chalk.green(`./${projectDirectory}`)}`);
    if (existsSync(projectDirectory)) {
        console.info(`\n ${logSymbols.error}`, `error: the '${projectDirectory}' folder already exists\n`);
        return;
    }
    spinner.start();
    await checkLatestVersion(version);
    await pacote.extract(`@semaphore-protocol/cli-template-${template}@${version}`, `${currentDirectory}/${projectDirectory}`);
    await decompress(`${currentDirectory}/${projectDirectory}/files.tgz`, `${currentDirectory}/${projectDirectory}`);
    unlinkSync(`${currentDirectory}/${projectDirectory}/files.tgz`);
    copyFileSync(`${currentDirectory}/${projectDirectory}/.env.example`, `${currentDirectory}/${projectDirectory}/.env`);
    spinner.stop();
    console.info(`\n ${logSymbols.success}`, `Your project is ready!\n`);
    console.info(` Please, install your dependencies by running:\n`);
    console.info(`   ${chalk.cyan("cd")} ${projectDirectory}`);
    console.info(`   ${chalk.cyan("npm i")}\n`);
    const { scripts } = JSON.parse(readFileSync(`${currentDirectory}/${projectDirectory}/package.json`, "utf8"));
    if (scripts) {
        console.info(` Available scripts:\n`);
        console.info(`${Object.keys(scripts)
            .map((s) => `   ${chalk.cyan(`npm run ${s}`)}`)
            .join("\n")}\n`);
        console.info(` See the README.md file to understand how to use them!\n`);
    }
});
program
    .command("get-groups")
    .description("Get the list of groups from a supported network (e.g. goerli or arbitrum).")
    .option("-n, --network <network-name>", "Supported Ethereum network.")
    .allowExcessArguments(false)
    .action(async ({ network }) => {
    if (!network) {
        network = await getSupportedNetwork(supportedNetworks);
    }
    if (!supportedNetworks.includes(network)) {
        console.info(`\n ${logSymbols.error}`, `error: the network '${network}' is not supported\n`);
        return;
    }
    const groupIds = await getGroupIds(network);
    if (groupIds === null)
        return;
    const content = `${chalk.bold("Groups")} (${groupIds.length}): \n${groupIds
        .map((id) => ` - ${id}`)
        .join("\n")}`;
    console.info(`\n${content}\n`);
});
program
    .command("get-group")
    .description("Get the data of a group from a supported network (e.g. goerli or arbitrum).")
    .argument("[group-id]", "Identifier of the group.")
    .option("-n, --network <network-name>", "Supported Ethereum network.")
    .allowExcessArguments(false)
    .action(async (groupId, { network }) => {
    if (!network) {
        network = await getSupportedNetwork(supportedNetworks);
    }
    if (!supportedNetworks.includes(network)) {
        console.info(`\n ${logSymbols.error}`, `error: the network '${network}' is not supported\n`);
        return;
    }
    if (!groupId) {
        const groupIds = await getGroupIds(network);
        if (groupIds === null)
            return;
        groupId = await getGroupId(groupIds);
    }
    let group;
    const spinner = new Spinner(`Fetching group ${groupId}`);
    spinner.start();
    try {
        const semaphoreSubgraph = new SemaphoreSubgraph(network);
        group = await semaphoreSubgraph.getGroup(groupId);
        spinner.stop();
    }
    catch {
        try {
            const semaphoreEthers = new SemaphoreEthers(network);
            group = await semaphoreEthers.getGroup(groupId);
            group.admin = await semaphoreEthers.getGroupAdmin(groupId);
            spinner.stop();
        }
        catch {
            spinner.stop();
            console.info(`\n ${logSymbols.error}`, "error: the group does not exist\n");
            return;
        }
    }
    let content = ` ${chalk.bold("Id")}: ${group.id}\n`;
    content += ` ${chalk.bold("Admin")}: ${group.admin}\n`;
    content += ` ${chalk.bold("Merkle tree")}:\n`;
    content += `   Root: ${group.merkleTree.root}\n`;
    content += `   Depth: ${group.merkleTree.depth}\n`;
    content += `   Zero value: ${group.merkleTree.zeroValue}\n`;
    content += `   Number of leaves: ${group.merkleTree.numberOfLeaves}`;
    console.info(`\n${content}\n`);
});
program
    .command("get-members")
    .description("Get the members of a group from a supported network (e.g. goerli or arbitrum).")
    .argument("[group-id]", "Identifier of the group.")
    .option("-n, --network <network-name>", "Supported Ethereum network.")
    .allowExcessArguments(false)
    .action(async (groupId, { network }) => {
    if (!network) {
        network = await getSupportedNetwork(supportedNetworks);
    }
    if (!supportedNetworks.includes(network)) {
        console.info(`\n ${logSymbols.error}`, `error: the network '${network}' is not supported\n`);
        return;
    }
    if (!groupId) {
        const groupIds = await getGroupIds(network);
        if (groupIds === null)
            return;
        groupId = await getGroupId(groupIds);
    }
    let groupMembers;
    const spinner = new Spinner(`Fetching members of group ${groupId}`);
    spinner.start();
    try {
        const semaphoreSubgraph = new SemaphoreSubgraph(network);
        const group = await semaphoreSubgraph.getGroup(groupId, { members: true });
        groupMembers = group.members;
        spinner.stop();
    }
    catch {
        try {
            const semaphoreEthers = new SemaphoreEthers(network);
            groupMembers = await semaphoreEthers.getGroupMembers(groupId);
            spinner.stop();
        }
        catch {
            spinner.stop();
            console.info(`\n ${logSymbols.error}`, "error: the group does not exist\n");
            return;
        }
    }
    if (groupMembers.length === 0) {
        console.info(`\n ${logSymbols.info}`, "info: there are no members in this group\n");
        return;
    }
    const content = `${chalk.bold("Members")} (${groupMembers.length}): \n${groupMembers
        .map((member, i) => `   ${i}. ${member}`)
        .join("\n")}`;
    console.info(`\n${content}\n`);
});
program
    .command("get-proofs")
    .description("Get the proofs of a group from a supported network (e.g. goerli or arbitrum).")
    .argument("[group-id]", "Identifier of the group.")
    .option("-n, --network <network-name>", "Supported Ethereum network.")
    .allowExcessArguments(false)
    .action(async (groupId, { network }) => {
    if (!network) {
        network = await getSupportedNetwork(supportedNetworks);
    }
    if (!supportedNetworks.includes(network)) {
        console.info(`\n ${logSymbols.error}`, `error: the network '${network}' is not supported\n`);
        return;
    }
    if (!groupId) {
        const groupIds = await getGroupIds(network);
        if (groupIds === null)
            return;
        groupId = await getGroupId(groupIds);
    }
    let verifiedProofs;
    const spinner = new Spinner(`Fetching proofs of group ${groupId}`);
    spinner.start();
    try {
        const semaphoreSubgraph = new SemaphoreSubgraph(network);
        const group = await semaphoreSubgraph.getGroup(groupId, { verifiedProofs: true });
        verifiedProofs = group.verifiedProofs;
        spinner.stop();
    }
    catch {
        try {
            const semaphoreEthers = new SemaphoreEthers(network);
            verifiedProofs = await semaphoreEthers.getGroupVerifiedProofs(groupId);
            spinner.stop();
        }
        catch {
            spinner.stop();
            console.info(`\n ${logSymbols.error}`, "error: the group does not exist\n");
            return;
        }
    }
    if (verifiedProofs.length === 0) {
        console.info(`\n ${logSymbols.info}`, "info: there are no proofs in this group\n");
        return;
    }
    const content = `${chalk.bold("Proofs")} (${verifiedProofs.length}): \n${verifiedProofs
        .map(({ signal, merkleTreeRoot, externalNullifier, nullifierHash }, i) => `   ${i}. signal: ${signal} \n      merkleTreeRoot: ${merkleTreeRoot} \n      externalNullifier: ${externalNullifier} \n      nullifierHash: ${nullifierHash}`)
        .join("\n")}`;
    console.info(`\n${content}\n`);
});
program.parse(process.argv);
