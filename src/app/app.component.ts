import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
declare var $;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	texts:any = '';
	ss:any = '2019-05-20';
	// http://tgw.qipai.com.cn:6121/uc/urm/groups
	node = {
		children: [],
		count: "37",
		disabled: false,
		expanded: false,
		groupCode: "70000172",
		key: "c01a5e55-076d-4221-b5c5-072767f09484",
		leaf: true,
		path: "/福建柒牌集团有限公司/柒牌集团/信息管理中心/开发&UED部",
		storeCode: null,
		title: "开发&UED部",
		type: "领域"
	}

	setting = {
		check: {
			enable: true,//checkbox
			chkboxType: { "Y": "s", "N": "s" }
		},
		view: {
			nameIsHTML: true, //允许name支持html				
			selectedMulti: false
		},
		edit: {
			enable: false,
			editNameSelectAll: false
		},
		data: {
			simpleData: {
				enable: true
			},
			key: {
				name: 'title'
			}
		},
		callback: {
			// beforeClick: this.beforeClick,
			onCheck: this.onCheck
		}
	};


	items = [{
		name: 'IT', id: 9, children: [
			{
				name: 'Programming', id: 91, children: [{
					name: 'Frontend', id: 911, children: [
						{ name: 'Angular 1', id: 9111 },
						{ name: 'Angular 2', id: 9112 },
						{ name: 'ReactJS', id: 9113 }
					]
				}, {
					name: 'Backend', id: 912, children: [
						{ name: 'C#', id: 9121 },
						{ name: 'Java', id: 9122 },
						{ name: 'Python', id: 9123 }
					]
				}]
			},
			{
				name: 'Networking', id: 92, children: [
					{ name: 'Internet', id: 921 },
					{ name: 'Security', id: 922 }
				]
			}
		]
	}]
	sss:any = [
		{
			name:'Networking',
			id:'sdsd22'
		},
		{
			name:'Internet',
			id:'kksjfksdu878'
		},
		{
			name:'Security',
			id:'oiwoioe77'
		},
		{ name: null, id: '9121' },
		{ name: 'Java', id: '9122' },
		{ name: 'Python', id: '9123' }
	]

	items1:Array<any> = [];
	constructor(
		private http: HttpClient
	) {

	}
	ngOnInit(): void {
		// this.items1 = Array.from({ length: 15 }).map((val,i) => i + 1)
		// for(let i = 0; i < 15; i++){
		// 	this.items1.push(i + 1)
		// }
		
		this.http.get('http://tgw.qipai.com.cn:6121/uc/urm/groups', {
			headers: {
				'Authorization': 'd21a93c80bc9434bb00595aaf54b291e'
			}
		}).subscribe(res => {
			this.items = res['data']['children'];
			$.fn.zTree.init($("#treeDemo"), this.setting, this.items);
			this.fuzzySearch('treeDemo', '#key', null, true); //初始化模糊搜索方法

			var zTree = $.fn.zTree.getZTreeObj("treeDemo"); // 获取树对象
			var nodes = zTree.getNodes(); // 获取节点
			if (nodes.length > 0) {
				console.log(nodes[0]['children'][0])
				zTree.checkNode(nodes[0]['children'][0], true, true); // 设置选中节点
			}
		})



		
	}

	beforeClick(treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.checkNode(treeNode, !treeNode.checked, null, true);
		return false;
	}

	onCheck(e, treeId, treeNode) {
		debugger
		var zTree = $.fn.zTree.getZTreeObj("treeDemo"), // 获取树对象
			nodes = zTree.getCheckedNodes(true), // 获取选中的节点
			v = "";
		var ss = zTree.transformToArray(treeNode); // 将选中或取消选中的节点转换成数组
	}





	fuzzySearch(zTreeId, searchField, isHighLight, isExpand) {
		var zTreeObj = $.fn.zTree.getZTreeObj(zTreeId);//get the ztree object by ztree id
		if (!zTreeObj) {
			alert("fail to get ztree object");
		}
		var nameKey = zTreeObj.setting.data.key.name; //get the key of the node name
		isHighLight = isHighLight === false ? false : true;//default true, only use false to disable highlight
		isExpand = isExpand ? true : false; // not to expand in default
		zTreeObj.setting.view.nameIsHTML = isHighLight; //allow use html in node name for highlight use

		var metaChar = '[\\[\\]\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]'; //js meta characters
		var rexMeta = new RegExp(metaChar, 'gi');//regular expression to match meta characters

		// keywords filter function 
		function ztreeFilter(zTreeObj, _keywords, callBackFunc?) {
			if (!_keywords) {
				_keywords = ''; //default blank for _keywords 
			}

			// function to find the matching node
			function filterFunc(node) {
				if (node && node.oldname && node.oldname.length > 0) {
					node[nameKey] = node.oldname; //recover oldname of the node if exist
				}
				zTreeObj.updateNode(node); //update node to for modifications take effect
				if (_keywords.length == 0) {
					//return true to show all nodes if the keyword is blank
					zTreeObj.showNode(node);
					zTreeObj.expandNode(node, false);
					return true;
				}
				//transform node name and keywords to lowercase
				if (node[nameKey] && node[nameKey].toLowerCase().indexOf(_keywords.toLowerCase()) != -1) {
					if (isHighLight) { //highlight process
						//a new variable 'newKeywords' created to store the keywords information 
						//keep the parameter '_keywords' as initial and it will be used in next node
						//process the meta characters in _keywords thus the RegExp can be correctly used in str.replace
						var newKeywords = _keywords.replace(rexMeta, function (matchStr) {
							//add escape character before meta characters
							return '\\' + matchStr;
						});
						node.oldname = node[nameKey]; //store the old name  
						var rexGlobal = new RegExp(newKeywords, 'gi');//'g' for global,'i' for ignore case
						//use replace(RegExp,replacement) since replace(/substr/g,replacement) cannot be used here
						node[nameKey] = node.oldname.replace(rexGlobal, function (originalText) {
							//highlight the matching words in node name
							var highLightText =
								'<span style="color: whitesmoke;background-color: darkred;">'
								+ originalText
								+ '</span>';
							return highLightText;
						});
						zTreeObj.updateNode(node); //update node for modifications take effect
					}
					zTreeObj.showNode(node);//show node with matching keywords
					return true; //return true and show this node
				}

				zTreeObj.hideNode(node); // hide node that not matched
				return false; //return false for node not matched
			}

			var nodesShow = zTreeObj.getNodesByFilter(filterFunc); //get all nodes that would be shown
			processShowNodes(nodesShow, _keywords);//nodes should be reprocessed to show correctly
		}

		/**
		 * reprocess of nodes before showing
		 */
		function processShowNodes(nodesShow, _keywords) {
			if (nodesShow && nodesShow.length > 0) {
				//process the ancient nodes if _keywords is not blank
				if (_keywords.length > 0) {
					$.each(nodesShow, function (n, obj) {
						var pathOfOne = obj.getPath();//get all the ancient nodes including current node
						if (pathOfOne && pathOfOne.length > 0) {
							//i < pathOfOne.length-1 process every node in path except self
							for (var i = 0; i < pathOfOne.length - 1; i++) {
								zTreeObj.showNode(pathOfOne[i]); //show node 
								zTreeObj.expandNode(pathOfOne[i], true); //expand node
							}
						}
					});
				} else { //show all nodes when _keywords is blank and expand the root nodes
					var rootNodes = zTreeObj.getNodesByParam('level', '0');//get all root nodes
					$.each(rootNodes, function (n, obj) {
						zTreeObj.expandNode(obj, true); //expand all root nodes
					});
				}
			}
		}

		//listen to change in input element
		$(searchField).bind('input propertychange', function () {
			var _keywords = $(this).val();
			searchNodeLazy(_keywords); //call lazy load
		});

		var timeoutId = null;
		var lastKeyword = '';
		// excute lazy load once after input change, the last pending task will be cancled  
		function searchNodeLazy(_keywords) {
			if (timeoutId) {
				//clear pending task
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(function () {
				if (lastKeyword === _keywords) {
					return;
				}
				ztreeFilter(zTreeObj, _keywords); //lazy load ztreeFilter function 
				// $(searchField).focus();//focus input field again after filtering
				lastKeyword = _keywords;
			}, 500);
		}
	}
}
