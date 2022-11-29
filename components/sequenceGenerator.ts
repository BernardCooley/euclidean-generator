interface Props {
    trigs: number;
    steps: number;
}

export const SequenceGenerator = ({ trigs, steps }: Props): number[] => {
    let groups = [];
    for (let i = 0; i < steps; i++) groups.push([Number(i < trigs)]);

    let l: number;
    while ((l = groups.length - 1)) {
        let start = 0;
        const first = groups[0];
        while (start < l && compareArrays(first, groups[start])) start++;
        if (start === l) break;

        let end = l,
            last = groups[l];
        while (end > 0 && compareArrays(last, groups[end])) end--;
        if (end === 0) break;

        const count = Math.min(start, l - end);
        groups = groups
            .slice(0, count)
            .map(function (group, i) {
                return group.concat(groups[l - i]);
            })
            .concat(groups.slice(count, -count));
    }
    return groups.flat();
};

const compareArrays = (a: number[], b: number[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
};
