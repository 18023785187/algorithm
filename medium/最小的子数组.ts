/**
    跳转至长度最小的子数组
    https://leetcode-cn.com/problems/minimum-size-subarray-sum/
 */
/**
    给定一个含有 n 个正整数的数组和一个正整数 target 。
    找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，
    并返回其长度。
    如果不存在符合条件的子数组，返回 0 。
 */
/**
 * 
 * @param target 
 * @param nums 
 * @returns {number}
 */
function minSubArrayLen(target: number, nums: number[]): number {
    let res: number = Infinity
    let l: number = 0
    let sum: number = 0
    for (let i = 0; i < nums.length; ++i) {
        sum += nums[i]
        if (sum >= target) {
            // l指针移动进行累减，使其符合sum >= target时sum最小
            while (sum >= target) sum -= nums[l++]
            sum += nums[--l]
            // 此时连续数组长度最小
            res = Math.min(res, i - l + 1)
        }
    }
    return res === Infinity ? 0 : res
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/121716309
 */