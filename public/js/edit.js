(function(){
	$('#atricle-edit').click(function(){
		var data = $('#atricle-edit').parents('form').serialize();
		$.ajax({
			url:'/article/edit',
			data:data,
			type:'post',
			success:function(res){
				if(res.code == 1){
					alert('保存成功');
				}else{
					alert(res.msg)
				}
			}
		});
	});
})();