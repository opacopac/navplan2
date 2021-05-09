<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SearchUserPoint;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserPointRepo;


class SearchUserPointUc implements ISearchUserPointUc {
    public function __construct(
        private IUserPointRepo $userPointRepo,
        private ITokenService $tokenService
    ) {
    }


    public function searchByExtent(Extent2d $extent, string $token): array {
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
