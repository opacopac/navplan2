<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;


class SearchUserPoint {
    private $userPointRepo;
    private $tokenService;


    public function __construct(IUserConfig $config) {
        $this->userPointRepo = $config->getUserRepoFactory()->createUserPointRepo();
        $this->tokenService = $config->getTokenService();
    }


    public function searchByExtent(Extent $extent, string $token): array {
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            return [];
        }

        return $this->userPointRepo->searchByExtent($extent, $email);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults, string $token): array {
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            return [];
        }

        return $this->userPointRepo->searchByPosition($position, $maxRadius_deg, $maxResults, $email);
    }


    public function searchByText(string $searchText, int $maxResults, string $token): array {
        $email = $this->tokenService->getEmailFromToken($token);
        if (!$email) {
            return [];
        }

        return $this->userPointRepo->searchByText($searchText, $maxResults, $email);
    }
}
