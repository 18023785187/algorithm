/**
    跳转至 监控二叉树
    https://leetcode-cn.com/problems/binary-tree-cameras/
 */
/**
    给定一个二叉树，我们在树的节点上安装摄像头。

    节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。

    计算监控树的所有节点所需的最小摄像头数量。
 */

/**
 *  一般这种情况多样的首先都会想到用动态规划去求解，关键在于如何找到状态转移公式和处理边界问题。

    假设当前的节点为root，其左右孩子节点分别记为left、right，要使三者都被检测到的话可以分为两种情况：

        1. 在root上放置摄像头，那么left和right都可以被检测到，目前只需保证left的子树和right的子树被检测到即可。

        2. 不在root上放置摄像头，那么left和right必定需要放置摄像头，且需保证left的子树和right的子树被检测到。

    综上所述，我们可以将root的状态分为三种：

        状态a：在root上放置节点，保证root子树都被检测到的摄像头数目。

        状态b：覆盖整个子树所需的摄像头数目。

        状态c：只保证root子树都被检测到的摄像头数目，不保证root是否被检测到。

    设三种状态对应的左右子树所需的摄像头数目为  和 。

        对于状态a，可以推导出  （状态c的左子树和右子树的总摄像头数目+1，保证root放置了摄像头）；

        对于状态b，可以推导出  （状态a可能不是最优解，那么还需比较其余两种符合的结果）；

        对于状态c，可以推导出  （对于状态c，状态a和状态b都符合状态c的条件，取其二最小值）。

        最后一步处理边界，当root为空的时候，那么将不需要放置摄像头。对于状态b和状态c而言是无需比较状态a的值的，所以状态a的结果返回Infinity。
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}
function minCameraCover(root: TreeNode | null): number {
    function dfs(root: TreeNode | null): [number, number, number] {
        // 当root为空的时候，那么将不需要放置摄像头。对于状态b和状态c而言是无需比较状态a的值的，所以状态a的结果返回Infinity。
        if (!root) return [Infinity, 0, 0]
        const [la, lb, lc] = dfs(root.left)
        const [ra, rb, rc] = dfs(root.right)
        const a: number = lc + rc + 1
        const b: number = Math.min(a, Math.min(la + rb, ra + lb))
        const c: number = Math.min(a, lb + rb)
        return [a, b, c]
    }
    // 我们最终需要的答案为状态b
    return dfs(root)[1]
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/122176230
 */