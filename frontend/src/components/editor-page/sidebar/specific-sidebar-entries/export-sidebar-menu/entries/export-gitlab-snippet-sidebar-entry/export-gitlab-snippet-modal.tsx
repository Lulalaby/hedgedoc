/*
 * SPDX-FileCopyrightText: 2024 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useState } from 'react'
import type { ModalVisibilityProps } from '../../../../../../common/modals/common-modal'
import { CommonModal } from '../../../../../../common/modals/common-modal'
import { useTranslation } from 'react-i18next'
import { useTranslatedText } from '../../../../../../../hooks/common/use-translated-text'
import { IconGitlab } from '../../../../../../common/icons/additional/icon-gitlab'
import { GitlabAuthenticationPage } from './modal-pages/gitlab-authentication-page'

enum GitlabSnippetModalPage {
  AUTHENTICATION,
  EXPORT_SETTINGS
}

/**
 * Renders the modal for exporting the note content to a GitHub Gist.
 *
 * @param show true to show the modal, false otherwise.
 * @param onHide Callback that is fired when the modal is about to be closed.
 */
export const ExportGitlabSnippetModal: React.FC<ModalVisibilityProps> = ({ show, onHide }) => {
  useTranslation()
  const [page, setPage] = useState<GitlabSnippetModalPage>(GitlabSnippetModalPage.AUTHENTICATION)
  const [gitlabUrl, setGitlabUrl] = useState<string>('')
  const [gitlabToken, setGitlabToken] = useState<string>('')
  const textService = useTranslatedText('editor.export.gitlab.service')
  const textModalTitle = useTranslatedText('editor.export.common.title', { service: textService })

  const gotoExportSettingsPage = useCallback(() => {
    setPage(GitlabSnippetModalPage.EXPORT_SETTINGS)
  }, [])

  const gotoAuthenticationPage = useCallback(() => {
    setPage(GitlabSnippetModalPage.AUTHENTICATION)
  }, [])

  return (
    <CommonModal show={show} onHide={onHide} title={textModalTitle} showCloseButton={true} titleIcon={IconGitlab}>
      {page === GitlabSnippetModalPage.AUTHENTICATION && (
        <GitlabAuthenticationPage
          gotoNextPage={gotoExportSettingsPage}
          url={gitlabUrl}
          setUrl={setGitlabUrl}
          token={gitlabToken}
          setToken={setGitlabToken}
        />
      )}
      {page === GitlabSnippetModalPage.EXPORT_SETTINGS && <div>Export settings</div>}
    </CommonModal>
  )
}
