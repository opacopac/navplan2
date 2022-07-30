<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use mysqli_result;
use Navplan\System\DomainModel\IDbResult;


class MySqlDbResult implements IDbResult {
    public function __construct(private mysqli_result $result) {
    }


    public function getNumRows(): int {
        return $this->getResult()->num_rows;
    }


    public function fetch_assoc(): ?array {
        return $this->getResult()->fetch_assoc();
    }


    private function getResult(): mysqli_result {
        return $this->result;
    }
}
