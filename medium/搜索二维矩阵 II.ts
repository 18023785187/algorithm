/**
    跳转至 搜索二维矩阵 II
    https://leetcode-cn.com/problems/search-a-2d-matrix-ii/
 */
/**
    编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

    每行的元素从左到右升序排列。
    每列的元素从上到下升序排列。
 */

/**
    由题意可知矩阵的横纵向的值到时按升序排序的，
    通过观察可以发现将矩阵逆时针旋转45度后矩阵以中间线为基准左边的值是要小于右边的值的，
    这个性质类似于二叉树的特性，因此我们可以使用类似于二叉树搜索的方法去查找目标值。
 */
function searchMatrix(matrix: number[][], target: number): boolean {
    // 以矩阵右上角为起始处（二叉树的首部）
    let row: number = 0
    let col: number = matrix[0].length - 1
    while (col >= 0 && row < matrix.length) {
        const cur: number = matrix[row][col]
        // 如果当前值小于目标值，row指针下移（二叉树往右子节点走）
        if (cur < target)
            row++
        // 如果当前值大于目标值，col指针左移（二叉树往左子节点走）
        else if (cur > target)
            col--
        else
            return true
    }
    return false
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/121925084
 */