<?php

namespace App\Enums;

enum Mood: int
{
    case Serious  = 1;
    case Informal = 2;
    case Consult  = 3;
    case Happy    = 4;

    public function word(): string
    {
        return match($this) {
            self::Serious  => "真面目な",
            self::Informal => "砕けた",
            self::Consult  => "相談事",
            self::Happy    => "幸せそうな"
        };
    }

}
