/**
    跳转到 从二叉树一个节点到另一个节点每一步的方向
    https://leetcode-cn.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/
 */
/**
        给你一棵 二叉树 的根节点 root ，这棵二叉树总共有 n 个节点。每个节点的值为 1 到 n 中的一个整数，且互不相同。给你一个整数 startValue ，表示起点节点 s 的值，和另一个不同的整数 destValue ，表示终点节点 t 的值。

        请找到从节点 s 到节点 t 的 最短路径 ，并以字符串的形式返回每一步的方向。每一步用 大写 字母 'L' ，'R' 和 'U' 分别表示一种方向：

        'L' 表示从一个节点前往它的 左孩子 节点。
        'R' 表示从一个节点前往它的 右孩子 节点。
        'U' 表示从一个节点前往它的 父 节点。
        请你返回从 s 到 t 最短路径 每一步的方向。
 */

/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/
/**
 * @param {TreeNode} root
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
    // 初始化 子->父 关系表childAndParentRelation，这个关系表用于存放每个节点与其父节点；初始化start和dest，他们分别表示起始节点与终点节点；初始化stack栈，用于下面的先序遍历；初始化res，表示结果值。
    let start = null
    let dest = null
    const stack = [root]
    const childAndParentRelation = new Map()
    childAndParentRelation.set(root, null)
    let res = ''
    // 通过先序遍历把对应的子父关系存放进childAndParentRelation，当找到start和dest时，先序遍历可以提前结束。
    while (stack.length) {
        const treeNode = stack.pop()
        if (treeNode.val === startValue)
            start = treeNode
        else if (treeNode.val === destValue)
            dest = treeNode
        if (start && dest)
            break
        if (treeNode.right) {
            childAndParentRelation.set(treeNode.right, treeNode)
            stack.push(treeNode.right)
        }
        if (treeNode.left) {
            childAndParentRelation.set(treeNode.left, treeNode)
            stack.push(treeNode.left)
        }
    }
    // 初始化startRelation和destRelation，这两者表示start和dest到root的所有父节点队列，通过遍历childAndParentRelation将会得到完整的两者；初始化target，表示start和dest的共同祖先。
    let startRelation = [start]
    let destRelation = [dest]
    let target = null
    while (childAndParentRelation.has(start)) {
        const parent = childAndParentRelation.get(start)
        startRelation.push(parent)
        start = parent
    }
    while (childAndParentRelation.has(dest)) {
        const parent = childAndParentRelation.get(dest)
        destRelation.push(parent)
        dest = parent
    }
    // 遍历startRelation，找到最近共同祖先，在查找的过程相当于往上查找，可以往res上加入'U'。
    for (const curTreeNode of startRelation) {
        if (destRelation.includes(curTreeNode)) {
            target = curTreeNode
            break
        }
        res += 'U'
    }
    // 找到destRelation中target的位置，然后在destRelation数组中从target到dest倒序循环，判断每个值应该是'L'还是'R'并加入到res。
    const idx = destRelation.indexOf(target)
    for (let i = idx; i > 0; --i) {
        if (destRelation[i].left === destRelation[i - 1]) {
            res += 'L'
        } else {
            res += 'R'
        }
    }
    return res
}; 

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/121780810
 */