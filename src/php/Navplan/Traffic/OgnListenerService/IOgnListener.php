<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;


interface IOgnListener {
    public function start(int $sessionId, int $maxAgeSec);
}
