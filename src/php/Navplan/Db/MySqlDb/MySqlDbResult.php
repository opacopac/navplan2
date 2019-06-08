<?php declare(strict_types=1);

namespace Navplan\Db\MySqlDb;

use mysqli_result;
use Navplan\Db\UseCase\IDbResult;


class MySqlDbResult implements IDbResult {
    private $result;


    private function getResult(): mysqli_result {
        return $this->result;
    }


    public function __construct(mysqli_result $result) {
        $this->result = $result;
    }


    public function getNumRows(): int {
        return $this->getResult()->num_rows;
    }


    public function fetch_assoc(): ?array {
        return $this->getResult()->fetch_assoc();
    }
}
