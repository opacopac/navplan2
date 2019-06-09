<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\ITimeService;


class MockTimeService implements ITimeService {
    /* @var $strtotimeRelativeDate int */
    public $strtotimeRelativeDate;
    /* @var $strtotimeResult ?int */
    public $strtotimeResult;
    /* @var $strtotimeArgs array */
    public $strtotimeArgs;


    public function strtotime(string $time): ?int {
        $this->strtotimeArgs = [$time];

        if ($this->strtotimeRelativeDate) {
            return strtotime($time, $this->strtotimeRelativeDate);
        }

        return $this->strtotimeResult;
    }
}
