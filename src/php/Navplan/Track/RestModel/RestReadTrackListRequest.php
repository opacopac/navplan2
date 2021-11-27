<?php declare(strict_types=1);

namespace Navplan\Track\RestModel;

use Navplan\Common\StringNumberHelper;


class RestReadTrackListRequest {
    public function __construct(
        public string $token
    ) {
    }


    public static function fromRest(array $args): RestReadTrackListRequest {
        return new RestReadTrackListRequest(
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}
