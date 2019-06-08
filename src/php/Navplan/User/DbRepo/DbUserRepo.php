<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\Db\UseCase\IDbService;
use Navplan\User\Domain\User;
use Navplan\User\UseCase\IUserRepo;


class DbUserRepo implements IUserRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function checkEmailExists(string $email): bool {
        $email = $this->getDbService()->escapeString($email);
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = $this->getDbService()->execSingleResultQuery($query, TRUE, "error checking email");

        if ($result->getNumRows() == 1) {
            return TRUE;
        } else {
            return FALSE;
        }
    }


    public function createUser(string $email, string $password) {
        $email = $this->getDbService()->escapeString($email);
        $pw_hash = password_hash($password, PASSWORD_BCRYPT);
        $pw_hash = $this->getDbService()->escapeString($pw_hash);
        $query = "INSERT INTO users (token, email, pw_hash) VALUES ('DUMMY','" . $email . "','" . $pw_hash . "')";
        $this->getDbService()->execCUDQuery($query, "error creating user");
    }


    public function readUser(string $email): ?User {
        $email = $this->getDbService()->escapeString($email);
        $query = "SELECT id FROM users WHERE email = '" . $email . "'";
        $result = $this->getDbService()->execSingleResultQuery($query, TRUE, "error reading user");

        if ($result->getNumRows() !== 1) {
            return NULL;
        } else {
            $row = $result->fetch_assoc();
            return DbUser::fromDbResult($row);
        }
    }


    public function updatePassword(string $email, string $newPassword) {
        $newpw_hash = password_hash($newPassword, PASSWORD_BCRYPT);
        $newpw_hash = $this->getDbService()->escapeString($newpw_hash);
        $query = "UPDATE users SET pw_hash='" . $newpw_hash . "' WHERE email='" . $email . "'";
        $this->getDbService()->execCUDQuery($query, "error updating password");
    }


    public function verifyPwHash(string $email, string $password): bool {
        $email = $this->getDbService()->escapeString($email);
        $query = "SELECT pw_hash FROM users WHERE email='" . $email . "'";
        $result = $this->getDbService()->execSingleResultQuery($query, TRUE, "error verifying pw hash");

        if ($result->getNumRows() == 1) {
            $row = $result->fetch_assoc();
            $pw_hash_db = $row["pw_hash"];

            if ($pw_hash_db === crypt($password, $pw_hash_db)) {
                return TRUE;
            } else {
                return FALSE;
            }
        }

        return FALSE;
    }
}
