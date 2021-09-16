import React from 'react'
import Button from '@atlaskit/button'
import styled, {css} from 'styled-components'
import CheckIcon from '@atlaskit/icon/glyph/check'
// import Xicon from '@atlaskit/icon/glyph/calendar'

const ButtonStyled = styled(Button)`
    margin-top: 4px;
    text-align: left;

    &,
    &:hover { 
        ${(p) => p.iscompleted === "true" && css`
                text-decoration: line-through;
            `
        }
    }

    &:hover{
        .check-icon{
            display: block;
        }
    }

    .check-icon{
        display: none;

        &:hover{
            background-color: #ccc;
            border-radius: 4px;
        }
    }
`;

export default function Todo({todo, onCheckBtnClick}) {
    return <ButtonStyled 
                iscompleted={todo.isCompleted.toString()}
                shouldFitContainer 
                iconAfter={ 
                    !todo.isCompleted && (
                        <span className="check-icon" onClick={() => onCheckBtnClick(todo.id)}>
                            <CheckIcon primaryColor="#4fff4f"/>
                        </span>
                    )
                }
            >{todo.name}</ButtonStyled>
}
