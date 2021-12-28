/**
    跳转至 交错字符串
    https://leetcode-cn.com/problems/interleaving-string/
 */
/**
    给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。

    两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：

    s = s1 + s2 + ... + sn
    t = t1 + t2 + ... + tm
    |n - m| <= 1
    交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 + ...
    提示：a + b 意味着字符串 a 和 b 连接。
 */

function isInterleave(s1: string, s2: string, s3: string): boolean {
    if (s1.length + s2.length !== s3.length) return false
    const col: number = s1.length + 1
    const row: number = s2.length + 1
    const dp: boolean[][] = new Array(col).fill([]).map(() => new Array(row))
    dp[0][0] = true
    for (let i = 1; i < col; ++i) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1]
    }
    for (let i = 1; i < row; ++i) {
        dp[0][i] = dp[0][i - 1] && s2[i - 1] === s3[i - 1]
    }
    for (let i = 1; i < col; ++i) {
        for (let j = 1; j < row; ++j) {
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
        }
    }
    return dp[col - 1][row - 1]
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/122192432
 */