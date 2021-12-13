/**
    跳转到 边界着色
    https://leetcode-cn.com/problems/coloring-a-border/
 */
/**
    给你一个大小为 m x n 的整数矩阵 grid ，表示一个网格。另给你三个整数 row、col 和 color 。网格中的每个值表示该位置处的网格块的颜色。

    两个网格块属于同一 连通分量 需满足下述全部条件：

        两个网格块颜色相同
        在上、下、左、右任意一个方向上相邻
    连通分量的边界 是指连通分量中满足下述条件之一的所有网格块：

        在上、下、左、右四个方向上与不属于同一连通分量的网格块相邻
        在网格的边界上（第一行/列或最后一行/列）
    请你使用指定颜色 color 为所有包含网格块 grid[row][col] 的 连通分量的边界 进行着色，并返回最终的网格 grid 。
 */

function colorBorder(grid: number[][], row: number, col: number, color: number): number[][] {
    if (color === grid[row][col]) return grid
    const rowLen: number = grid.length
    const colLen: number = grid[0].length
    // 初始化一个和grid长度和宽度一致的map，用于记录所有相同颜色（grid[row][col]的颜色）的位置，map中0表示不同颜色的块、1表示相同颜色的块、2表示遍历过的相同颜色的块。
    const map: number[][] = new Array(rowLen)
        .fill(0)
        .map(() => new Array(colLen).fill(0))
    const oldColor: number = grid[row][col]
    for (let i = 0; i < rowLen; ++i) {
        for (let j = 0; j < colLen; ++j) {
            if (grid[i][j] === oldColor)
                map[i][j] = 1
        }
    }
    ; (function dfs(y: number, x: number): void {
        // 对row、col位置开启深度优先遍历，遇到不同颜色的块将退出遍历，遇到相同颜色的块（1）将其标记为以遍历过的相同颜色的块（2）。
        if (y < 0 || x < 0 || y >= rowLen || x >= colLen)
            return
        if (grid[y][x] !== oldColor || map[y][x] !== 1)
            return
        if (grid[y][x] === color)
            return
        map[y][x] = 2
        // 对于边缘的相同颜色的块，将其染色，并对其余三个方向进行深度优先遍历。
        if (y === 0) {
            grid[y][x] = color
            dfs(y, x + 1)
            dfs(y, x - 1)
            dfs(y + 1, x)
            return
        }
        if (y === rowLen - 1) {
            grid[y][x] = color
            dfs(y, x + 1)
            dfs(y, x - 1)
            dfs(y - 1, x)
            return
        }
        if (x === 0) {
            grid[y][x] = color
            dfs(y + 1, x)
            dfs(y - 1, x)
            dfs(y, x + 1)
            return
        }
        if (x === colLen) {
            grid[y][x] = color
            dfs(y + 1, x)
            dfs(y - 1, x)
            dfs(y, x - 1)
            return
        }
        // 对于不在边缘的相同颜色的块，判断其是否符合四周被相同颜色的块所包围，如果符合将不做染色处理，如果不符合就将其染色。对四个方向进行深度优先遍历。
        if (
            (map[y + 1][x] === 1 ||
                map[y + 1][x] === 2) &&
            (map[y - 1][x] === 1 ||
                map[y - 1][x] === 2) &&
            (map[y][x + 1] === 1 ||
                map[y][x + 1] === 2) &&
            (map[y][x - 1] === 1 ||
                map[y][x - 1] === 2)
        ) { } else {
            grid[y][x] = color
        }
        dfs(y + 1, x)
        dfs(y - 1, x)
        dfs(y, x + 1)
        dfs(y, x - 1)
    })(row, col)
    return grid
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/121779966
 */