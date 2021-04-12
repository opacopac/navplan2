<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\DomainService\ITimeService;


class MockTimeService implements ITimeService {
    public int $strtotimeRelativeDate;
    public ?int $strtotimeResult;
    public array $strtotimeArgs;


    public function strtotime(string $time): ?int {
        $this->strtotimeArgs = [$time];

        if ($this->strtotimeRelativeDate) {
            return strtotime($time, $this->strtotimeRelativeDate);
        }

        return $this->strtotimeResult;
    }
}
