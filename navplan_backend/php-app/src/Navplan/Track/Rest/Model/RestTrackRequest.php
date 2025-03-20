<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Model;

use Navplan\Track\Domain\Model\Track;


class RestTrackRequest
{
    public const ARG_TRACK = "track";


    public function __construct(
        public Track $track
    )
    {
    }


    public static function fromRest(array $args, int $id = -1): RestTrackRequest
    {
        return new RestTrackRequest(
            RestTrackConverter::fromRest($args[self::ARG_TRACK], $id)
        );
    }
}
