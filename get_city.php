<?php

header("Content-type: text/html; charset=windows-1251");
	
	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' && $_GET['get_city']){

		$link = 'http://ipgeobase.ru:7020/geo?ip='.get_ip();
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $link);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 3);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
		$string = curl_exec($ch);

		$data = parse_string($string);
		$city = $data['city'];
		if (!$city){
			$city = $data['country'];
		}
		if ($city){
			print $city;
		}
	}
	
	function parse_string($string)
	{
		$pa['inetnum'] = '#<inetnum>(.*)</inetnum>#is';
		$pa['country'] = '#<country>(.*)</country>#is';
		$pa['city'] = '#<city>(.*)</city>#is';
		$pa['region'] = '#<region>(.*)</region>#is';
		$pa['district'] = '#<district>(.*)</district>#is';
		$pa['lat'] = '#<lat>(.*)</lat>#is';
		$pa['lng'] = '#<lng>(.*)</lng>#is';
		$data = array();
		foreach($pa as $key => $pattern)
		{
			preg_match($pattern, $string, $out);
			if(isset($out[1]) && $out[1])
			$data[$key] = trim($out[1]);
		}
		return $data;
	}	

	function get_ip()
	{
		if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ip = trim(strtok($_SERVER['HTTP_X_FORWARDED_FOR'], ','));
		
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ip = $_SERVER['HTTP_CLIENT_IP'];       
		
		if (isset($_SERVER['REMOTE_ADDR']))
			$ip = $_SERVER['REMOTE_ADDR'];
		
		if (isset($_SERVER['HTTP_X_REAL_IP']))
			$ip = $_SERVER['HTTP_X_REAL_IP'];
		
		return $ip;            
	}

?>