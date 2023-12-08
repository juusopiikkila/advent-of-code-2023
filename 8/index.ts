import lcm from 'compute-lcm';
import type { ProgramDefinition } from '../utils';

export class Node {
    public left: Node | undefined;

    public right: Node | undefined;

    constructor(
        public readonly name: string,
    ) {}

    setLeft(node: Node) {
        this.left = node;
    }

    getLeft() {
        if (!this.left) {
            throw new Error('Left node not found');
        }

        return this.left;
    }

    setRight(node: Node) {
        this.right = node;
    }

    getRight() {
        if (!this.right) {
            throw new Error('Right node not found');
        }

        return this.right;
    }
}

export class Map {
    private nodes: Node[] = [];

    constructor(
        private readonly instructions: string[],
        private readonly alternativeMode = false,
    ) {}

    addNode(node: Node) {
        this.nodes.push(node);
    }

    getNode(name: string) {
        return this.nodes.find((node) => node.name === name);
    }

    getRootNodes(): Node[] {
        const rootNodes = this.nodes.filter((node) => (
            this.alternativeMode
                ? node.name.endsWith('A')
                : node.name === 'AAA'
        ));

        if (rootNodes.length === 0) {
            throw new Error('Root node not found');
        }

        return rootNodes;
    }

    getSteps() {
        const rootNodes = this.getRootNodes();
        const nodeSteps = Array.from({ length: rootNodes.length }, () => 0);

        for (const [index, node] of rootNodes.entries()) {
            let currentNode = node;

            while (this.alternativeMode ? !currentNode.name.endsWith('Z') : currentNode.name !== 'ZZZ') {
                const instruction = this.instructions[nodeSteps[index] % this.instructions.length];

                currentNode = instruction === 'L' ? currentNode.getLeft() : currentNode.getRight();

                nodeSteps[index] += 1;
            }
        }

        if (nodeSteps.length === 1) {
            return nodeSteps[0];
        }

        /* istanbul ignore next this will always return non-null value */
        return lcm(nodeSteps) ?? 0;
    }
}

export default class Program implements ProgramDefinition {
    parseMap(input: string[], alternativeMode = false) {
        const instructions = [...input[0]];

        const map = new Map(instructions, alternativeMode);

        const lines = input.slice(2).map((line) => {
            const matches = line.match(/^(\w+) = \((\w+), (\w+)\)$/);

            if (!matches) {
                throw new Error('Invalid line');
            }

            return matches;
        });

        for (const matches of lines) {
            const node = new Node(matches[1]);

            map.addNode(node);
        }

        for (const matches of lines) {
            const node = map.getNode(matches[1]);
            const left = map.getNode(matches[2]);
            const right = map.getNode(matches[3]);

            if (!node || !left || !right) {
                throw new Error('Nodes not found');
            }

            node.setLeft(left);
            node.setRight(right);
        }

        return map;
    }

    runPart1(input: string[]) {
        const map = this.parseMap(input);

        return map.getSteps();
    }

    runPart2(input: string[]) {
        const map = this.parseMap(input, true);

        return map.getSteps();
    }
}
