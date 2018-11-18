<?php namespace Navplan;


class Message {
    public $code;
    public $text;


    public function __construct(int $code, string $text)
    {
        $this->code = $code;
        $this->text = $text;
    }
}
