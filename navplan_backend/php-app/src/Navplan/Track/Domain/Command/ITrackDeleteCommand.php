<?php declare(strict_types=1);

namespace Navplan\Track\Domain\Command;


interface ITrackDeleteCommand
{
    function delete(int $trackId, int $userId);
}
