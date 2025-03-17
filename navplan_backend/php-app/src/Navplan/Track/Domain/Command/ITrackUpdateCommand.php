<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Command;

use Navplan\Track\Domain\Model\Track;


interface ITrackUpdateCommand
{
    function update(Track $track, int $userId): Track;
}
