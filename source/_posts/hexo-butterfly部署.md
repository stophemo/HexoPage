---
title: hexo-butterfly部署
date: 2022/12/13 11:51:35
updated: 2022/12/13 11:51:35
tags: 
    - hexo
    - butterfly
sticky: 99
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

## hexo-butterfly部署（windows）

### 一、服务器初始化配置

​	实例密码、防火墙等

### 二、安装环境

#### 安装node.js、npm

https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi

#### 安装Git

- 官网链接：

  https://github.com/git-for-windows/git/releases/download/v2.39.0.windows.1/Git-2.39.0-64-bit.exe

- 国内镜像链接

  https://registry.npmmirror.com/binary.html?path=git-for-windows/v2.39.0.windows.1/

#### 安装Nginx

官网下载

https://nginx.org/download/nginx-1.20.2.zip

解压，双击nginx.exe 启动，会闪现一个小黑框

服务器上访问[http://localhost:80](http://localhost/)，出现Welcome to Nginx！ 即成功安装

打开任务管理器关闭nginx进程。

##### nginx基础操作命令

没有配置环境变量的话需要在nginx文件夹下以 `./nginx` 代替`nginx`

```sh
# 启动
nginx.exe 
	# 或者 
	start nginx	
# 关闭Nginx
	# 快速停止nginx
	nginx -s stop  
	# 完整有序的停止nginx
	nginx -s quit
	# 使用taskkill命令
	taskkill /f /t /im nginx.exe
# 重启（修改nginx.conf）
	nginx -s reload
```

##### nginx配置环境变量

**系统变量——> 环境配置——>新建系统变量 NGINX_HOME**

![image-20221213101126816](img/ECS.assets/image-20221213101126816.png)

然后将 `%NGINX_HOME%` 添加到系统变量PATH

#### 安装hexo相关环境

- 所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。

```
$ npm install -g hexo-cli
```

- Hexo 3.0 把服务器独立成了个别模块，您必须先安装 [hexo-server](https://github.com/hexojs/hexo-server)才能使用。

```
$ npm install hexo-server --save
```

- 安装 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)。

```
$ npm install hexo-deployer-git --save
```

### 三、nginx配置部署

![image-20221213102310395](img/ECS.assets/image-20221213102310395.png)

1。项目文件放于html文件夹下

![image-20221213102629342](img/ECS.assets/image-20221213102629342.png)

2。修改配置文件

用记事本儿打开conf/nginx.conf, 直接看server{。。。}

```nginx

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;    # 端口，ip后面不加端口号默认访问80端口
        server_name  localhost;  # 服务器地址，填写公网ip 或者 域名

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
           # root   html; # 项目文件根路径，修改为自己的路径
            root html/public; # 到这里就已经可以通过 localhost 访问到项目资源了
            
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```

#### 如果 域名、ssl配好后

参照如下规则配置

我这里是将ssl证书放在nginx/conf文件夹下

![image-20221213104050711](img/ECS.assets/image-20221213104050711.png)

80端口的server

```nginx
server {
        listen       80;
        server_name  stophemo.top www.stophemo.top; # 以空格分隔多个域名
        rewrite ^(.*)$ https://${server_name}$1 permanent; # 将所有http请求转发到https，即 下一步配置的server
    }
```

443 ssl 的 server

```nginx
server {
        listen       443 ssl;
        server_name  stophemo.top www.stophemo.top;
        ssl_certificate      stophemo.top/stophemo.top_bundle.pem;
        ssl_certificate_key  stophemo.top/stophemo.top.key;
        location / {
            root   /www/wwwroot/public;
            index  index.html index.htm;
        }
         # 防止爬虫抓取 （可选）
        if ($http_user_agent ~* "360Spider|JikeSpider|Spider|spider|bot|Bot|2345Explorer|curl|wget|webZIP|qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|NSPlayer|bingbot")
        {
            return 403;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

配置完成，重启nginx服务

```sh
nginx -s reload
```

浏览器访问域名地址，测试通过

![image-20221213104602006](img/ECS.assets/image-20221213104602006.png)

### hexo-butterfly部署（linux）

服务器配置同上，

安装环境的方式不一样

因为我用的宝塔面板安装的，没有的可以自行百度各个环境的安装教程