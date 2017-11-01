<?php

header ( "Content-type:text/html;charset=utf-8" );
$action = $_GET['action'];

switch($action) {
	case 'init_data_list':
		init_data_list();
		break;
	case 'add_row':
		add_row();
		break;
	case 'del_row':
		del_row();
		break;
	case 'edit_row':
		edit_row();
		break;
}

function init_data_list(){
	$sql="select * from `et_data`";
	$query=query_sql($sql);
	while($row = $query->fetch_assoc()){
		$data[] = $row;
	}
	//var_dump($data);
	echo json_encode($data);
}
function del_row(){
	$dataid=$_POST['dataid'];
	$sql="delete from `et_data` where id=".$dataid;
	if(query_sql($sql)){
		echo "ok";
	}else{
		echo "error...";
	}
}
function add_row(){
	if(empty($_POST)){
		echo "METHOD NOT ALLOWED >>>> ";
	}
	$sql = "INSERT INTO `et_data` ( `c_a`,`c_b`,`c_c`,`c_d`,`c_e`,`c_f`,`c_g`,`c_h`)values(";
	for($i = 0;$i < 8 ; $i++){
		$sql .= "'" . addslashes($_POST[ 'col_' . $i]) . "',";
	}
	$sql = trim($sql,",");
	$sql.=")";
	if($res=query_sql($sql,"select last_insert_id() as LD")){
		$d=$res->fetch_assoc();
		echo $d['LD'];
	}else{
		echo "error...";
	}
}

function edit_row(){
	if(empty($_POST)){
		echo "METHOD NOT ALLOWED >>>> ";
	}
	$id=$_POST['id'];
	unset($_POST['id']);
	$sql = "update `et_data` set ";
	for($i = 0;$i < 8 ; $i++){
		$sql .= "`c_".chr(97+$i)."`='".$_POST['col_'.$i]."',";
	}
	$sql = trim($sql,",");
	$sql.=" where id=".$id;
	if(query_sql($sql)){
		echo "ok";
	}else{
		echo "error...";
	}
}

function query_sql(){
	$mysqli = new mysqli("localhost", "root", "123456", "etable");
	$mysqli->query("set names utf8");
	$sqls = func_get_args();
	foreach($sqls as $s){
		$query = $mysqli->query($s);
	}
	$mysqli->close();
	return $query;
}
