# emacs 基本操作

Emacs的三种基本对象是:帧(frame)、窗口(window)、缓冲区(buffer)。

## [基本命令网址](https://w-lianfu.github.io/#num26)

### SPC == 空格 (Emacs 风格 '~~' M+ m)

### C == CTRL

### M == ESC

# 退出emacs
	C+x C+c

# 文件操作

	打开文件 C+x C+f

	保存文件 C+x C+s

	撤销 C-x u / q 退出

# 跳转
  * [ ]
  
	M + m j l '行号'
	M + m j j 'str 单词'

# Treemacs

> Treemacs是在屏幕左侧出现，便于用户进行文件管理的侧边栏。

## 节点选择
	j/k：光标下移/上移
	u：如果当前树上有选中文件的父节点，则跳转过去
	h：将当前树的根节点向上移动一级
	l：将当前树的根节点切换到选中文件

## 节点打开
	tab：展开/闭合目录或者文件
	return：展开/闭合目录或者打开文件
	o h：水平新建屏幕打开文件，用dired打开目录
	o v：垂直新建屏幕打开文件，用dired打开目录
	o x：根据文件的扩展名使用系统应用打开文件

## 节点操作

	SPC p t 打开
	M+m 0 打开/切入

	c f 新建文件
	c d 新建文件夹
	R 重命名操作

## 显示选择

	g r：刷新目录
	w：重设宽度
	y y：拷贝当前文件路径
	y r：拷贝当前根目录路径
	s：按照特殊标准重新排列文件

## 窗口操作 

	删除 SPC w d 

	切换 SPC 1/2/3/4


## buffer操作

	C+x K 关闭当前 buffer

	左侧树 M+x treemacs-select-window /or/ M + m 0 

	打开终端 M+ ! // 暂时无法运行命令 

	M + b d	删除当前buffer

## 编辑模式

	切换 C-z  // buffer颜色 黄色=vim=SPC 蓝色=emacs=M-m

## 配置文件
	SPC f e d 打开配置文件
	SPC f e R 保存并重载配置文件

