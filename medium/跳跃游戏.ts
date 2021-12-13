/**
    跳转到 跳跃游戏
    https://leetcode-cn.com/problems/jump-game/
 */
/**
    给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
    数组中的每个元素代表你在该位置可以跳跃的最大长度。
    判断你是否能够到达最后一个下标。
 */

/**
    1. 初始化curIdx = nums.length - 1，curIdx表示当前能到达的下标。
    2. 从倒数第二项开始遍历数组，只要当前项的值能到达curIdx就将当前索引赋值给curIdx。
    3. 遍历结束，如果curIdx = 0即说明可以从起点到终点，返回true。
    总结
        整个题解的思路是从后往前逆推，一步步找到是否能到达下一个点的点，
        当逆推到起点时就说明了可以从起点到达终点。
 */
function canJump(nums: number[]): boolean {
    // 初始化curIdx = nums.length - 1，curIdx表示当前能到达的下标。
    let curIdx: number = nums.length - 1
    // 从倒数第二项开始遍历数组，只要当前项的值能到达curIdx就将当前索引赋值给curIdx
    for (let i = nums.length - 2; i >= 0; --i) {
        if (nums[i] - (curIdx - i) >= 0)
            curIdx = i
    }
    // 遍历结束，如果curIdx = 0即说明可以从起点到终点，返回true。
    return curIdx === 0
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/121871628
 */