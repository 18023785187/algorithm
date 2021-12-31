/**
    跳转至 矩阵中的最长递增路径
    https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/
 */
/**
    给定一个 m x n 整数矩阵 matrix ，找出其中 最长递增路径 的长度。

    对于每个单元格，你可以往上，下，左，右四个方向移动。 
    你 不能 在 对角线 方向上移动或移动到 边界外（即不允许环绕）。
 */

/**
 *  采用深度优先遍历 + 记忆化求解，
 * 初始化一个temp数组用于存储遍历时每个节点已经得出的最长递增路径，
 * 以防止其他节点需要走重复节点时进行重复计算。

    关于这类题型都可以使用记忆化搜索，其好处是避免了重复计算。
 */
function longestIncreasingPath(matrix: number[][]): number {
    let maxPath: number = 1
    const col: number = matrix.length
    const row: number = matrix[0].length
    const temp: number[][] = new Array(col).fill(0).map(() => new Array(row).fill(0))
    for (let i = 0; i < col; ++i) {
        for (let j = 0; j < row; ++j) {
            maxPath = Math.max(maxPath, dfs(i, j, -Infinity))
        }
    }
    function dfs(y: number, x: number, prevNum: number): number {
        if (y < 0 || x < 0 || y >= col || x >= row || matrix[y][x] <= prevNum) {
            return 0
        }
        if (temp[y][x]) return temp[y][x]
        const path: number = Math.max(
            dfs(y + 1, x, matrix[y][x]),
            dfs(y - 1, x, matrix[y][x]),
            dfs(y, x + 1, matrix[y][x]),
            dfs(y, x - 1, matrix[y][x])
        ) + 1
        temp[y][x] = path
        return path
    }
    return maxPath
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/122256039
 */