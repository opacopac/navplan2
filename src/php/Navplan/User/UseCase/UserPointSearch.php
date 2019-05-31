<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


class UserPointSearch {
    private $repo;


    private function getRepo(): IUserPointRepo {
        return $this->repo;
    }


    public function __construct(IUserPointRepo $repo) {
        $this->repo = $repo;
    }


    public function searchByExtent(Extent $extent, string $token): array {
        $email = UserHelper::getEmailFromToken($token);
        if (!$email) {
            return [];
        }

        return $this->getRepo()->searchByExtent($extent, $email);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $token): array {
        $email = UserHelper::getEmailFromToken($token);
        if (!$email) {
            return [];
        }

        return $this->getRepo()->searchByPosition($position, $maxRadius_deg, $maxResults, $email);
    }


    public function searchByText(string $searchText, int $maxResults, string $token): array {
        $email = UserHelper::getEmailFromToken($token);
        if (!$email) {
            return [];
        }

        return $this->getRepo()->searchByText($searchText, $maxResults, $email);
    }
}
