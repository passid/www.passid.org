Password Generator
====
one username , gives you different passwords between multiple websites/apps. Visit <http://www.passid.org>

-<https://chrome.google.com/webstore/detail/password-generator/ipbgallljgdaagijkillefhnfcmjgodm>(download chrome extension)
-<www.passid.org> is hosting by github，and all password generates by client's browsers. We don't collect any data
-<www.passid.org> is an open source project, you can fork it on github
-We used sha512 and base64，and the hash function is base64(sha512(account + app + salt)).substr(((account + app + data.salt).length + length*length, length)
-We adds some special words in base64, such as -@#~,.[]()!%^*$&
-We don't support ie6, ie7 and ie8.


-<https://chrome.google.com/webstore/detail/password-generator/ipbgallljgdaagijkillefhnfcmjgodm>(下载chrome插件)
-<www.passid.org>架设在github，所有密码在浏览器生成，不提交任何数据到后端，欢迎右键
-<www.passid.org>完全开源，代码托管在github，欢迎fork
-hash采用公开算法的sha512和base64，生成方法为base64(sha512(用户名 + 网站 + salt)).substr((account + app + data.salt).length + -截取长度*截取长度, 截取长度)，有效防止cmd5等网站的现有库^_^
-base64在基准字符集上增加的字符为-@#~,.[]()!%^*$&
-不支持低于ie9之前的古董浏览器，如果侥幸浏览正常，实属意外。