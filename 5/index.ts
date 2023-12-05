import type { ProgramDefinition } from '../utils';

type MapType =
    | 'seed-to-soil'
    | 'soil-to-fertilizer'
    | 'fertilizer-to-water'
    | 'water-to-light'
    | 'light-to-temperature'
    | 'temperature-to-humidity'
    | 'humidity-to-location';

interface Map {
    type: MapType
    ranges: {
        destinationRangeStart: number
        sourceRangeStart: number
        rangeLength: number
    }[]
}

interface InputData {
    seeds: number[]
    maps: Map[]
}

export default class Program implements ProgramDefinition {
    getMaps(input: string[]): Map[] {
        const groups = input.join('\n').split('\n\n').map((group) => group.split('\n'));
        const maps: Map[] = [];

        for (const group of groups) {
            if (group[0].includes('map:')) {
                const map: Map = {
                    type: group[0].replace(' map:', '') as MapType,
                    ranges: [],
                };

                for (const line of group.slice(1)) {
                    const matches = line.match(/^(\d+) (\d+) (\d+)$/);

                    if (!matches) {
                        throw new Error('Invalid input');
                    }

                    map.ranges.push({
                        destinationRangeStart: Number(matches[1]),
                        sourceRangeStart: Number(matches[2]),
                        rangeLength: Number(matches[3]),
                    });
                }

                maps.push(map);
            }
        }

        const seedToSoilMap = maps.find((map) => map.type === 'seed-to-soil');
        const soilToFertilizerMap = maps.find((map) => map.type === 'soil-to-fertilizer');
        const fertilizerToWaterMap = maps.find((map) => map.type === 'fertilizer-to-water');
        const waterToLightMap = maps.find((map) => map.type === 'water-to-light');
        const lightToTemperatureMap = maps.find((map) => map.type === 'light-to-temperature');
        const temperatureToHumidityMap = maps.find((map) => map.type === 'temperature-to-humidity');
        const humidityToLocationMap = maps.find((map) => map.type === 'humidity-to-location');

        if (
            !seedToSoilMap
             || !soilToFertilizerMap
             || !fertilizerToWaterMap
             || !waterToLightMap
             || !lightToTemperatureMap
             || !temperatureToHumidityMap
             || !humidityToLocationMap
        ) {
            throw new Error('Invalid input');
        }

        return [
            seedToSoilMap,
            soilToFertilizerMap,
            fertilizerToWaterMap,
            waterToLightMap,
            lightToTemperatureMap,
            temperatureToHumidityMap,
            humidityToLocationMap,
        ];
    }

    getSeedRanges(input: string[], useSeedRange = false): [number, number][] {
        const matches = input[0].match(/^seeds: ([\d\s]+)$/);

        if (!matches) {
            throw new Error('Invalid input');
        }

        const seedNumbers = matches[1].split(' ').map(Number);
        const ranges: [number, number][] = [];

        if (useSeedRange) {
            for (let index = 0; index < seedNumbers.length; index += 2) {
                ranges.push([seedNumbers[index], seedNumbers[index] + seedNumbers[index + 1] - 1]);
            }
        } else {
            for (const number of seedNumbers) {
                ranges.push([number, number]);
            }
        }

        return ranges;
    }

    getSeedMapLocation(seed: number, map: Map, reverse = false): number {
        for (const range of map.ranges) {
            if (
                reverse
                && seed >= range.destinationRangeStart
                && seed < (range.destinationRangeStart + range.rangeLength)
            ) {
                return (seed - range.destinationRangeStart) + range.sourceRangeStart;
            }

            if (
                !reverse
                && seed >= range.sourceRangeStart
                && seed < (range.sourceRangeStart + range.rangeLength)
            ) {
                return (seed - range.sourceRangeStart) + range.destinationRangeStart;
            }
        }

        return seed;
    }

    getSeedLocation(seed: number, maps: InputData['maps'], reverse = false): number {
        let location = seed;

        if (reverse) {
            for (const map of [...maps].reverse()) {
                location = this.getSeedMapLocation(location, map, true);
            }
        } else {
            for (const map of maps) {
                location = this.getSeedMapLocation(location, map);
            }
        }

        return location;
    }

    runPart1(input: string[]) {
        const maps = this.getMaps(input);
        let min = Number.POSITIVE_INFINITY;

        for (const [seed] of this.getSeedRanges(input)) {
            const location = this.getSeedLocation(seed, maps);

            if (location < min) {
                min = location;
            }
        }

        return min;
    }

    runPart2(input: string[]) {
        const maps = this.getMaps(input);
        const seedRanges = this.getSeedRanges(input, true);

        const locationMap = maps.find((map) => map.type === 'humidity-to-location');
        const maxLocation = Math.max(...locationMap!.ranges.map((range) => (
            range.destinationRangeStart + range.rangeLength - 1
        )));

        for (let location = 0; location < maxLocation; location += 1) {
            const seed = this.getSeedLocation(location, maps, true);

            for (const [seedRangeStart, seedRangeEnd] of seedRanges) {
                if (seed >= seedRangeStart && seed <= seedRangeEnd) {
                    return location;
                }
            }
        }

        throw new Error('No solution found');
    }
}
