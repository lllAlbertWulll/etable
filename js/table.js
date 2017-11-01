$(function() {

	var g_table=$("table.data");
	var url = "table.php?action=init_data_list"
	$.get(url,function(data){
		var row_items=$.parseJSON(data);
		for(var i=0,j=row_items.length;i<j;i++){
			var data_dom=create_row(row_items[i]);
			g_table.append(data_dom);
		}
	});

	function delHandler(){
		var data_id=$(this).attr("dataid");
		var meButton=$(this);
		$.post("table.php?action=del_row",{dataid:data_id},function(res){
			if("ok"==res){
				$(meButton).parent().parent().remove();
			}else{
				alert("删除失败......");
			}
		});
	}

	function editHandler(){
		var data_id=$(this).attr("dataid");
		var meButton=$(this);
		var meRow=$(this).parent().parent();
		var editRow=$("<tr></tr>");
		for(var i=0;i<8;i++){
			var editTd=$("<td><input type='text' class='txtField' /></td>");
			var v=meRow.find('td:eq('+i+')').html();
			editTd.find('input').val(v);
			editRow.append(editTd);
		}


		var opt_td=$("<td></td>");
		var saveButton=$("<a href='javascript:;' class='optLink'>保存 </a>");
		saveButton.click(function(){
			var currentRow=$(this).parent().parent();
			var input_fields=currentRow.find("input");
			var post_fields={};
			for(var i=0,j=input_fields.length;i<j;i++){
				post_fields['col_'+i]=input_fields[i].value;
			}
			post_fields['id']=data_id;
			$.post("table.php?action=edit_row",post_fields,function(res){
				if(res=='ok'){
					var updateRow=create_row(post_fields);
					currentRow.replaceWith(updateRow);
				}else{
					alert("数据更新失败");
				}
			});
		});
		var cancelButton=$("<a href='javascript:;' class='optLink'>取消</a>");
		cancelButton.click(function(){
			var currentRow=$(this).parent().parent();
			meRow.find('a:eq(0)').click(delHandler);
			meRow.find('a:eq(1)').click(editHandler);
			currentRow.replaceWith(meRow);
		});

		opt_td.append(saveButton);
		opt_td.append(cancelButton);

		editRow.append(opt_td);
		meRow.replaceWith(editRow);
	}

	function create_row(data_item){
		var row_obj=$("<tr></tr>");
		for(var k in data_item){
			if("id"!=k){
				var col_td=$("<td></td>");
				col_td.html(data_item[k]);
				row_obj.append(col_td);
			}
		}
		var delButton=$("<a href='javascript:;' class='optLink'>删除 </a>");
		delButton.attr("dataid",data_item['id']);
		delButton.click(delHandler);

		var editButton=$("<a href='javascript:;' class='optLink'>编辑</a>");
		editButton.attr("dataid",data_item['id']);
		editButton.click(editHandler);

		var opt_td=$("<td></td>");
		opt_td.append(delButton);
		opt_td.append(editButton);
		row_obj.append(opt_td);
		return row_obj;
	}

	$("#addBtn").click(function(){
		var addRow=$("<tr></tr>");
		for(var i=0;i<8;i++){
			var col_td=$("<td><input class='txtField' type='text' value='' /></td>");
			addRow.append(col_td);
		}
		var col_opt=$("<td></td>");
		var confirmBtn=$("<a href='javascript:;' class='optLink'>确认 </a>");
		confirmBtn.click(function(){
			var currentRow=$(this).parent().parent();
			var input_fields=currentRow.find("input");
			var post_fields={};
			for(var i=0,j=input_fields.length;i<j;i++){
				post_fields['col_'+i]=input_fields[i].value;
			}
			$.post("table.php?action=add_row",post_fields,function(res){
				if(res>0){
					post_fields['id']=res;
					var postAddRow=create_row(post_fields);
					currentRow.replaceWith(postAddRow);
				}else{
					alert("插入失败");
				}
			});
		});
		var cancelBtn=$("<a href='javascript:;' class='optLink'>取消</a>");
		cancelBtn.click(function(){
			$(this).parent().parent().remove();
		});

		col_opt.append(confirmBtn);
		col_opt.append(cancelBtn);

		addRow.append(col_opt);
		g_table.append(addRow);
	});
});
