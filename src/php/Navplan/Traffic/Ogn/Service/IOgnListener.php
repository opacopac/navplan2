<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Service;


interface IOgnListener {
    public function start(int $sessionId, int $maxAgeSec);
}
