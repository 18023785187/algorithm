/**
    跳转到 被围绕的区域
    https://leetcode-cn.com/problems/surrounded-regions/
 */
/**
    给你一个 m x n 的矩阵 board ，
    由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，
    并将这些区域里所有的 'O' 用 'X' 填充。
 */

/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
    // 初始化一个与board长度宽度相同的矩阵map，用于保存被遍历到的'O'。
    const map: number[][] = new Array(board.length).fill(0).map(() => new Array(board[0].length).fill(1))
    // 遍历矩阵四周，在扫描到对board边缘上的'O'时就对这个'O'进行深度优先遍历，把深度优先遍历到的'O'的坐标加入到map上。
    for (let i = 0; i < board[0].length; ++i) {
        if (board[0][i] === 'O') {
            dfs(0, i)
        }
        if (board[board.length - 1][i] === 'O') {
            dfs(board.length - 1, i)
        }
    }
    for (let i = 0; i < board.length; ++i) {
        if (board[i][0] === 'O') {
            dfs(i, 0)
        }
        if (board[i][board[0].length - 1] === 'O') {
            dfs(i, board[0].length - 1)
        }
    }
    // 遍历结束后只需把没有在map上标记的'O'变成'X'即可。
    for (let i = 1; i < board.length - 1; ++i) {
        for (let j = 1; j < board[i].length - 1; ++j) {
            if (board[i][j] === 'O' && map[i][j] === 1) {
                board[i][j] = 'X'
            }
        }
    }
    function dfs(y: number, x: number): void {
        if (y < 0 || x < 0 || y >= board.length || x >= board[0].length)
            return
        if (board[y][x] === 'X' || map[y][x] === 0)
            return
        map[y][x] = 0
        dfs(y + 1, x)
        dfs(y - 1, x)
        dfs(y, x + 1)
        dfs(y, x - 1)
    }
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/121778602
 */