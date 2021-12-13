/**
 *  跳转至最长回文子串
    https://leetcode-cn.com/problems/longest-palindromic-substring/
 */
/**
  * 给你一个字符串 s，找到 s 中最长的回文子串。
  */

/**
 *  回文串指的是一个字符串的左边等于右边，比如 'aba'、'bb' 是回文串， 而 'dab' 则不是。
    思路：
        对给定字符串进行遍历，每次遍历都以遍历到的下标进行中心扩散，看看扩散到的左边与右边字符是否相等，如果相等即为回文串，否则不是。
        值得注意的是，每次遍历都执行了两次中心扩散，这是因为需要处理两种情况 'aba' 和 'bb'。
 * @param s
 * @returns {string}
 */
function longestPalindrome(s: string): string {
    if (s.length === 1) return s
    let maxPalindromeStr: string = ''
    for (let i = 0; i < s.length; ++i) {
        diffusionSearch(i, i)
        diffusionSearch(i, i + 1)
    }
    function diffusionSearch(left: number, right: number): void {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--
            right++
        }
        maxPalindromeStr = right - left - 1 > maxPalindromeStr.length ?
            s.substring(left + 1, right) :
            maxPalindromeStr
    }
    return maxPalindromeStr
};

/**
 * 详细题解：
 * https://blog.csdn.net/weixin_51612593/article/details/121904176
 */