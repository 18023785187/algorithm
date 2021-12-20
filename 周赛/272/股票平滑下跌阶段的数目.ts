/**
    跳转至 股票平滑下跌阶段的数目
    https://leetcode-cn.com/problems/number-of-smooth-descent-periods-of-a-stock/
 */
/*
    给你一个整数数组 prices ，表示一支股票的历史每日股价，其中 prices[i] 是这支股票第 i 天的价格。

    一个 平滑下降的阶段 定义为：对于 连续一天或者多天 ，每日股价都比 前一日股价恰好少 1 ，这个阶段第一天的股价没有限制。

    请你返回 平滑下降阶段 的数目。
*/

/**
    由题意可知数组项中有连续一个或多个项呈递减且递减量为1时即为平滑下降阶段。
    通过观察可以发现平滑下降阶段符合等差数列的规律，
    且d为1，那么我们可以通过遍历数组找到所有平滑下降阶段并对其进行求和，即可得出答案。
 */
function getDescentPeriods(prices: number[]): number {
    let descentCount: number = 0
    let i: number = 0
    while (i < prices.length) {
        let count: number
        // 以索引i和j作为符合条件的区间
        let j: number = i + 1
        for (; j < prices.length; ++j) {
            if (prices[j] !== prices[j - 1] - 1) {
                break
            }
        }
        // 得出区间内的元素总数
        count = j - i
        i = j
        // 利用等差数列求和公式对总数进行快速计算
        descentCount += ((1 + count) * count) / 2
    }
    return descentCount
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/122037619
 */