<?php namespace NavplanTest;

use Navplan\Shared\DbResult;


class DbResultMock extends DbResult
{
    const DUMMY_RESULT_LIST_0_ENTRY = [];
    const DUMMY_RESULT_LIST_1_ENTRY = [
        array("id" => 1, "name" => "first")];
    const DUMMY_RESULT_LIST_2_ENTRIES = [
        array("id" => 1, "name" => "first"),
        array("id" => 2, "name" => "second")];
    const DUMMY_RESULT_LIST_3_ENTRIES = [
        array("id" => 1, "name" => "first"),
        array("id" => 2, "name" => "second"),
        array("id" => 3, "name" => "third")];


    private $mockResultList;
    private $mockNumRows;

    public function __construct(array $mockResultList)
    {
        $this->mockResultList = $mockResultList;
        $this->mockNumRows = count($mockResultList);
    }


    public function getNumRows(): int
    {
        return $this->mockNumRows;
    }


    public function fetch_assoc()
    {
        return array_shift($this->mockResultList);
    }


    public function fetch_array(int $resultType = MYSQLI_ASSOC)
    {
        return array_shift($this->mockResultList);
    }
}
