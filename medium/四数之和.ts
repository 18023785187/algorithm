/**
    跳转至 四数之和
    https://leetcode-cn.com/problems/4sum/
 */
/**
    给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

    0 <= a, b, c, d < n
    a、b、c 和 d 互不相同
    nums[a] + nums[b] + nums[c] + nums[d] == target
    你可以按 任意顺序 返回答案 。
 */
/**
    和三数之和是同一个解法，都是排序+双指针。

    先排序保证数组有序。

    通过两层for循环定义前两个指针，在通过双指针法定义后两个指针，将四个指针的值相加，如果符合则将四个指针指向的值推进结果数组中。

    题目规定四元组不能重复，所以要对四个指针指向的相邻值作去重判断来确保结果唯一。
 */

function fourSum(nums: number[], target: number): number[][] {
    if (nums.length < 4) return []
    const res: number[][] = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 3; ++i) {
        if (nums[i - 1] === nums[i]) continue
        for (let j = i + 1; j < nums.length - 2; ++j) {
            if (j > i + 1 && nums[j - 1] === nums[j]) continue
            let l: number = j + 1
            let r: number = nums.length - 1
            while (l < r) {
                const sum: number = nums[i] + nums[j] + nums[l] + nums[r]
                if (sum > target) {
                    r--
                } else if (sum < target) {
                    l++
                } else {
                    res.push([nums[i], nums[j], nums[l], nums[r]])
                    while (nums[l] === nums[++l]) continue
                    while (nums[r] === nums[--r]) continue
                }
            }
        }
    }
    return res
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/122104954
 */