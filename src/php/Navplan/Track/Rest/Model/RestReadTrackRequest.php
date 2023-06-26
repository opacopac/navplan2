<?php declare(strict_types=1);

namespace Navplan\Track\Rest\Model;

use Navplan\Common\StringNumberHelper;


class RestReadTrackRequest {
    public function __construct(
        public int $trackId,
        public string $token
    ) {
    }


    public static function fromRest(array $args): RestReadTrackRequest {
        return new RestReadTrackRequest(
            StringNumberHelper::parseIntOrError($args, "trackid"),
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}
