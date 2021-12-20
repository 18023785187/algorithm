/**
    跳转至 使数组 K 递增的最少操作次数
    https://leetcode-cn.com/problems/minimum-operations-to-make-the-array-k-increasing/
 */
/*
    给你一个下标从 0 开始包含 n 个正整数的数组 arr ，和一个正整数 k 。

    如果对于每个满足 k <= i <= n-1 的下标 i ，都有 arr[i-k] <= arr[i] ，那么我们称 arr 是 K 递增 的。

    比方说，arr = [4, 1, 5, 2, 6, 2] 对于 k = 2 是 K 递增的，因为：
        arr[0] <= arr[2] (4 <= 5)
        arr[1] <= arr[3] (1 <= 2)
        arr[2] <= arr[4] (5 <= 6)
        arr[3] <= arr[5] (2 <= 2)
    但是，相同的数组 arr 对于 k = 1 不是 K 递增的（因为 arr[0] > arr[1]），对于 k = 3 也不是 K 递增的（因为 arr[0] > arr[3] ）。
    每一次 操作 中，你可以选择一个下标 i 并将 arr[i] 改成任意 正整数。

    请你返回对于给定的 k ，使数组变成 K 递增的 最少操作次数 。
*/

/**
    通过观察发现可以将数组arr划分为k组，且每一组的求解都互不影响，
    因此我们可以将数组arr拆分为k个小数组进行求解，小数组的每项arr[i]的相邻项是arr[i + k]。

    由题意可知每次操作都可以将arr的某项改为任意值，即我们无需关心将arr的某项改为什么值。
    对于修改数组的最小操作数使数组递增这个问题我们可以转化为求数组的最长子序列长度，
    因为我们求得最长的长度再用小数组长度减去该长度就可以得出最小操作数。

    1. 每次遍历每个小数组都要维护一个LIS数组，LIS的长度表示最长递增子序列的长度。

    2.遍历小数组，记当前项为target，通过二分查找找到LIS中找到最接近且最靠左且大于target的值；
        如果l等于LIS.length，那么说明LIS的长度需要增加，往LIS推入target；
        否则在LIS中找到最接近且最靠左且大于target的值，将该值改为target。

    3.当前小数组查找完毕，将当前结果添加到最终结果中。
 */
function kIncreasing(arr: number[], k: number): number {
    // 求得每个小数组的长度
    const kLen: number = arr.length / k
    let res: number = 0
    // 遍历每个小数组
    for (let i = 0; i < k; ++i) {
        // 最长递增子序列数组
        const LIS: number[] = [arr[i]]
        // 遍历小数组每项
        for (let j = k + i; j < arr.length; j += k) {
            const target: number = arr[j]
            let l = 0
            let r = LIS.length
            // 通过二分查找找到LIS中找到最接近且最靠左且大于target的值
            while (l < r) {
                let mid = (l + r) >> 1
                if (LIS[mid] > target)
                    r = mid
                else
                    l = mid + 1
            }
            // 如果l等于LIS.length，那么说明LIS的长度需要增加，往LIS推入target
            if (l === LIS.length) {
                LIS.push(target)
            } else {
                // 否则在LIS中找到最接近且最靠左且大于target的值，将该值改为target
                LIS[l] = target
            }
        }
        // 当前小数组查找完毕，将当前结果添加到最终结果中
        res += kLen - LIS.length
    }
    return res
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/122039817
 */