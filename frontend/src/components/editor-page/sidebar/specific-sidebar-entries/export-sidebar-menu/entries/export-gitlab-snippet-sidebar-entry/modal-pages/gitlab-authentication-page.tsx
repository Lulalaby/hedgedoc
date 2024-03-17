/*
 * SPDX-FileCopyrightText: 2024 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { Fragment } from 'react'
import { Button, FormControl, FormGroup, FormLabel, FormText, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ExternalLink } from '../../../../../../../common/links/external-link'
import { useOnInputChange } from '../../../../../../../../hooks/common/use-on-input-change'
import { useTranslatedText } from '../../../../../../../../hooks/common/use-translated-text'

export interface GitlabAuthenticationPageProps {
  gotoNextPage: () => void
  url: string
  token: string
  setUrl: (url: string) => void
  setToken: (token: string) => void
}

export const GitlabAuthenticationPage: React.FC<GitlabAuthenticationPageProps> = ({
  gotoNextPage,
  url,
  token,
  setUrl,
  setToken
}) => {
  useTranslation()
  const changeGitlabUrl = useOnInputChange(setUrl)
  const changeGitlabToken = useOnInputChange(setToken)
  const textTokenLink = useTranslatedText('editor.export.gitlab.infoTokenLink')

  return (
    <Fragment>
      <Modal.Body>
        <h5 className={'mb-2'}>
          <Trans i18nKey={'editor.export.gitlab.headingAuthentication'} />
        </h5>
        <FormGroup className={'my-2'}>
          <FormLabel>
            <Trans i18nKey={'editor.export.gitlab.fieldUrl'} />
          </FormLabel>
          <FormControl value={url} onChange={changeGitlabUrl} type={'url'} />
        </FormGroup>
        <FormGroup className={'my-2'}>
          <FormLabel>
            <Trans i18nKey={'editor.export.gitlab.fieldToken'} />
          </FormLabel>
          <FormControl value={token} onChange={changeGitlabToken} type={'password'} isInvalid={false} />
          <FormText muted={true}>
            <Trans i18nKey={'editor.export.gitlab.infoToken'} />{' '}
            <ExternalLink
              text={textTokenLink}
              href={`${url}/-/user_settings/personal_access_tokens?name=HedgeDoc+snippet+export&scopes=api`}
            />
          </FormText>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'success'} onClick={gotoNextPage} disabled={true}>
          <Trans i18nKey={'editor.export.gitlab.nextButton'} />
        </Button>
      </Modal.Footer>
    </Fragment>
  )
}
