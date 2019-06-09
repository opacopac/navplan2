<?php declare(strict_types=1);

namespace Navplan\System\UseCase;


interface ITimeService {
    public function strtotime(string $time): ?int;
}
