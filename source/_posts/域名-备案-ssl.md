---
title: 域名、备案、ssl
date: 2022/12/13 11:51:35
updated: 2022/12/13 11:51:35
tags: 
    - 域名 
    - 备案 
    - ssl
sticky: 
categories:     
keywords: 
description:
top_img: /img/index.jpg
comments:
cover: 
toc:
toc_number:
toc_style_simple:
copyright: true
copyright_author:
copyright_author_href: 
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
---

## 域名

到云平台根据提示进行域名购买注册。。。。。。。。。。。。。

### 域名解析

以阿里云为例：

进入域名控制台

![image-20221213105756368](img/ECS.assets/image-20221213105756368.png)

选择域名，点击解析，参考下图添加记录

![image-20221213110004048](img/ECS.assets/image-20221213110004048.png)

至此，在浏览器访问域名时，就会通过dns解析，访问到记录值所对应的服务器

注意：在未完成备案时，访问该域名大概率会失败，或许前几次可以成功

## ICP备案

在哪儿进行？：到阿里云或者腾讯云亦或者其他平台，皆可

怎么操作？：找到备案入口，根据提示进行一步步操作即可

需要注意什么？：提交备案信息过程中可能会有平台电话来访，注意及时接听。

耗时多久？：一般十五天左右，不同地区时间不同，我是耗了20天

另外，备案成功后 会提示让去做公安备案，这个可去可不去。

## ssl证书申请

同样到阿里云或者腾讯云都可以进行免费证书的申请，现目前2022-11-03 11:05:15两大平台都免费证书（限量20）可以申请

以阿里云为例

进入ssl证书控制台

![image-20221213110831394](img/ECS.assets/image-20221213110831394.png)

点击创建证书->证书申请->根据提示进行操作（需要在域名解析处添加记录）。。。。。。



签发完成后，点击下载，即可获得证书文件

![image-20221213111153558](img/ECS.assets/image-20221213111153558.png)


