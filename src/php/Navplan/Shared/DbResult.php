<?php namespace Navplan\Shared;

use mysqli_result;


class DbResult
{
    private $result;


    public function __construct(mysqli_result $result)
    {
        $this->result = $result;
    }


    public function getNumRows(): int
    {
        return $this->result->num_rows;
    }


    public function fetch_array(int $resultType = MYSQLI_ASSOC) {
        return $this->result->fetch_array($resultType);
    }


    public function fetch_assoc()
    {
        return $this->result->fetch_assoc();
    }
}
