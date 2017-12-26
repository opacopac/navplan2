<?php
	include "config.php";
	include "helper.php";

    // open db connection
	$conn = openDb();

    switch ($_SERVER['REQUEST_METHOD'])
    {
        case 'GET':
            if ($_GET["id"])
            {
                readUserTrack(
                    checkId(intval($_GET["id"])),
                    checkEscapeEmail($conn, $_GET["email"]),
                    checkEscapeToken($conn, $_GET["token"]),
                    checkString($_GET["callback"], 1, 50)
                );
            }
            else
            {
                readUserTrackList(
                    checkEscapeEmail($conn, $_GET["email"]),
                    checkEscapeToken($conn, $_GET["token"]),
                    checkString($_GET["callback"], 1, 50)
                );
            }
            break;
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            createUserTrack(
                checkEscapeEmail($conn, $_GET["email"]),
                checkEscapeToken($conn, $_GET["token"]),
                checkNumeric($input["timestamp"]),
                checkEscapeString($conn, $input["name"], 1, 100),
                checkEscapeString($conn, json_encode($input["positions"], JSON_NUMERIC_CHECK), 1, NULL)
            );
            break;
        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);
            updateUserTrack(
                checkEscapeEmail($conn, $_GET["email"]),
                checkEscapeToken($conn, $_GET["token"]),
                checkId($input["id"]),
                checkEscapeString($conn, $input["name"], 1, 100)
            );
            break;
        case 'DELETE':
            deleteUserTrack(
                checkId(intval($_GET["id"])),
                checkEscapeEmail($conn, $_GET["email"]),
                checkEscapeToken($conn, $_GET["token"])
            );
            break;
        default:
            die("unknown request");
    }

    // close db connection
	$conn->close();


	function readUserTrackList($email, $token, $callback)
	{
	    global $conn;

        $query = "SELECT utr.id, utr.timestamp, utr.name FROM user_tracks AS utr";
        $query .= " INNER JOIN users AS usr ON utr.user_id = usr.id";
        $query .= " WHERE usr.email = '" . $email . "' AND usr.token = '" . $token . "'";
        $query .= " ORDER BY utr.timestamp DESC";


		$result = $conn->query($query);

		if ($result === FALSE)
			die("error reading user tracks: " . $conn->error . " query:" . $query);

		$userTracks = [];

		while ($rs = $result->fetch_array(MYSQLI_ASSOC))
		{
			$userTracks[] = array(
				id => $rs["id"],
				timestamp => strtotime($rs["timestamp"]),
				name => $rs["name"]
			);
		}

        // create jsonp response
        echo $callback . "(";
		echo json_encode(array("tracks" => $userTracks), JSON_NUMERIC_CHECK);
		echo ")";
	}


	function readUserTrack($trackid, $email, $token, $callback)
	{
	    global $conn;

        $query = "SELECT utr.id, utr.timestamp, utr.name, utr.positions FROM user_tracks AS utr";
        $query .= " INNER JOIN users AS usr ON utr.user_id = usr.id";
        $query .= " WHERE usr.email = '" . $email . "' AND usr.token = '" . $token . "' AND utr.id = '" . $trackid . "'";
        $query .= " ORDER BY utr.timestamp DESC";

		$result = $conn->query($query);
		
		if ($result === FALSE || $result->num_rows != 1)
			die("error reading user track: " . $conn->error . " query:" . $query);

		$rs = $result->fetch_array(MYSQLI_ASSOC);

        $track = array(
            id => $rs["id"],
            timestamp => strtotime($rs["timestamp"]),
            name => $rs["name"],
            positions => json_decode($rs["positions"], true)
        );

        // create jsonp response
        echo $callback . "(";
		echo json_encode(array("track" => $track), JSON_NUMERIC_CHECK);
		echo ")";
	}
		
		
	function createUserTrack($email, $token, $timestamp, $name, $positions)
	{
	    global $conn;

		// get user id
		$query = "SELECT id FROM users AS usr WHERE email = '" . $email . "' AND token = '" . $token . "'";

		$result = $conn->query($query);

		if ($result === FALSE)
			die("error reading user id: " . $conn->error . " query:" . $query);

		if ($result->num_rows == 1)
		{
			$row = $result->fetch_assoc();
			$user_id = $row["id"];
		}
		else
			die("no valid user found");

		// create track
		$query =  "INSERT INTO user_tracks";
		$query .= " (user_id, timestamp, name, positions)";
		$query .= " VALUES ('" . $user_id . "', '" . date('Y-m-d G:i:s', $timestamp) . "', '" . $name . "', '" . $positions . "')";

		$result = $conn->query($query);
		
		if ($result === FALSE)
			die("error saving user track: " . $conn->error . " query:" . $query);

		
		echo json_encode(array("success" => 1), JSON_NUMERIC_CHECK);
	}
	
	
	function updateUserTrack($email, $token, $trackid, $name)
	{
	    global $conn;

		// check if user & track exists
		$query = "SELECT usr.id FROM users AS usr";
		$query .= " INNER JOIN user_tracks AS utr ON utr.user_id = usr.id";
		$query .= " WHERE utr.id = '" . $trackid . "' AND usr.email = '" . $email . "' AND usr.token = '" . $token . "'";

		$result = $conn->query($query);

		if ($result === FALSE)
			die("error reading user/track id: " . $conn->error . " query:" . $query);

		if ($result->num_rows == 1)
		{
			$row = $result->fetch_assoc();
			$user_id = $row["id"];
		}
		else
			die("no valid user / track found");

        // update track
		$query =  "UPDATE user_tracks SET";
		$query .= " name='" . $name . "'";
		$query .= " WHERE id='" . $trackid . "'";

		$result = $conn->query($query);

		if ($result === FALSE)
			die("error updating user track: " . $conn->error . " query:" . $query);

		echo json_encode(array("success" => 1), JSON_NUMERIC_CHECK);
	}


	function deleteUserTrack($trackid, $email, $token)
	{
	    global $conn;

		// check if user & track exists
		$query = "SELECT usr.id FROM users AS usr";
		$query .= " INNER JOIN user_tracks AS utr ON utr.user_id = usr.id";
		$query .= " WHERE utr.id = '" . $trackid . "' AND usr.email = '" . $email . "' AND usr.token = '" . $token . "'";
		
		$result = $conn->query($query);

		if ($result === FALSE)
			die("error reading user/track id: " . $conn->error . " query:" . $query);

		if ($result->num_rows == 1)
		{
			$query = "DELETE FROM user_tracks WHERE id = '" . $trackid . "'";

			$result = $conn->query($query);

			if ($result === FALSE)
				die("error deleting user track: " . $conn->error . " query:" . $query);
		}
		else
			die("no valid user / track found");
		
		echo json_encode(array("success" => 1), JSON_NUMERIC_CHECK);
	}	
?>