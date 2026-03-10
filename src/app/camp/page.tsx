'use client';

import { useEffect, useState } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import type { Hackathon, Team } from '@/lib/types';
import PageShell from '@/components/layout/PageShell';
import Card from '@/components/ui/Card';
import PixelButton from '@/components/ui/PixelButton';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';

export default function CampPage() {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formIntro, setFormIntro] = useState('');
  const [formHackathon, setFormHackathon] = useState('');
  const [formLookingFor, setFormLookingFor] = useState('');
  const [formContact, setFormContact] = useState('');

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      const storedTeams = getItem<Team[]>(STORAGE_KEYS.TEAMS);
      const storedHackathons = getItem<Hackathon[]>(STORAGE_KEYS.HACKATHONS);

      setTeams(storedTeams ?? []);
      setHackathons(storedHackathons ?? []);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (teams === null) return <LoadingState />;

  const filteredTeams =
    filter === 'all' ? teams : teams.filter(team => team.hackathonSlug === filter);
  const openTeams = filteredTeams.filter(team => team.isOpen);
  const closedTeams = filteredTeams.filter(team => !team.isOpen);

  function handleCreate() {
    if (!formName.trim()) return;

    const currentTeams = teams ?? [];
    const newTeam: Team = {
      id: `T-${Date.now()}`,
      hackathonSlug: formHackathon || undefined,
      name: formName.trim(),
      intro: formIntro.trim(),
      isOpen: true,
      lookingFor: formLookingFor
        .split(',')
        .map(role => role.trim())
        .filter(Boolean),
      contactUrl: formContact.trim(),
      memberCount: 1,
      createdAt: new Date().toISOString(),
    };

    const updatedTeams = [...currentTeams, newTeam];
    setTeams(updatedTeams);
    setItem(STORAGE_KEYS.TEAMS, updatedTeams);

    setFormName('');
    setFormIntro('');
    setFormHackathon('');
    setFormLookingFor('');
    setFormContact('');
    setShowForm(false);
  }

  return (
    <PageShell>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 font-pixel text-lg text-accent-orange">RECRUIT HUB</h1>
          <p className="font-dunggeunmo text-card-white/70">
            원정대를 찾거나 새 원정대를 만들어보세요
          </p>
        </div>
        <PixelButton onClick={() => setShowForm(!showForm)}>
          {showForm ? '닫기' : '+ 원정대 만들기'}
        </PixelButton>
      </div>

      {showForm && (
        <Card hover={false} className="mb-6">
          <h2 className="mb-4 font-pixel text-[10px] text-accent-yellow">
            NEW EXPEDITION
          </h2>
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-dunggeunmo text-xs text-dark-bg/70">
                원정대명 *
              </label>
              <input
                value={formName}
                onChange={event => setFormName(event.target.value)}
                className="w-full border-2 border-dark-border bg-dark-bg/5 px-3 py-2 font-dunggeunmo text-sm text-dark-bg"
                placeholder="예: Team Alpha"
              />
            </div>
            <div>
              <label className="mb-1 block font-dunggeunmo text-xs text-dark-bg/70">
                연결 해커톤
              </label>
              <select
                value={formHackathon}
                onChange={event => setFormHackathon(event.target.value)}
                className="w-full border-2 border-dark-border bg-dark-bg/5 px-3 py-2 font-dunggeunmo text-sm text-dark-bg"
              >
                <option value="">선택 없음</option>
                {hackathons.map(hackathon => (
                  <option key={hackathon.slug} value={hackathon.slug}>
                    {hackathon.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block font-dunggeunmo text-xs text-dark-bg/70">
                소개
              </label>
              <textarea
                value={formIntro}
                onChange={event => setFormIntro(event.target.value)}
                className="w-full border-2 border-dark-border bg-dark-bg/5 px-3 py-2 font-dunggeunmo text-sm text-dark-bg"
                rows={2}
                placeholder="팀 소개를 적어주세요"
              />
            </div>
            <div>
              <label className="mb-1 block font-dunggeunmo text-xs text-dark-bg/70">
                모집 포지션 (콤마 구분)
              </label>
              <input
                value={formLookingFor}
                onChange={event => setFormLookingFor(event.target.value)}
                className="w-full border-2 border-dark-border bg-dark-bg/5 px-3 py-2 font-dunggeunmo text-sm text-dark-bg"
                placeholder="예: Frontend, Designer"
              />
            </div>
            <div>
              <label className="mb-1 block font-dunggeunmo text-xs text-dark-bg/70">
                연락 링크
              </label>
              <input
                value={formContact}
                onChange={event => setFormContact(event.target.value)}
                className="w-full border-2 border-dark-border bg-dark-bg/5 px-3 py-2 font-dunggeunmo text-sm text-dark-bg"
                placeholder="https://..."
              />
            </div>
          </div>
          <PixelButton onClick={handleCreate}>원정대 생성</PixelButton>
        </Card>
      )}

      <div className="mb-6 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`whitespace-nowrap border-2 px-3 py-1.5 font-pixel text-[10px] transition-colors ${
            filter === 'all'
              ? 'border-accent-orange bg-accent-orange text-dark-bg'
              : 'border-dark-border bg-transparent text-card-white/70 hover:border-card-white/50'
          }`}
        >
          전체
        </button>
        {hackathons.map(hackathon => (
          <button
            key={hackathon.slug}
            onClick={() => setFilter(hackathon.slug)}
            className={`whitespace-nowrap border-2 px-3 py-1.5 font-pixel text-[10px] transition-colors ${
              filter === hackathon.slug
                ? 'border-accent-orange bg-accent-orange text-dark-bg'
                : 'border-dark-border bg-transparent text-card-white/70 hover:border-card-white/50'
            }`}
          >
            {hackathon.title.length > 15
              ? `${hackathon.title.slice(0, 15)}...`
              : hackathon.title}
          </button>
        ))}
        <span className="ml-auto self-center font-dunggeunmo text-xs text-card-white/50">
          {filteredTeams.length}개 원정대
        </span>
      </div>

      {filteredTeams.length === 0 ? (
        <EmptyState message="해당 조건의 원정대가 없습니다" />
      ) : (
        <div className="space-y-6">
          {openTeams.length > 0 && (
            <div>
              <h2 className="mb-3 font-pixel text-[10px] text-accent-mint">
                RECRUITING ({openTeams.length})
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {openTeams.map(team => (
                  <TeamCard key={team.id} team={team} hackathons={hackathons} />
                ))}
              </div>
            </div>
          )}
          {closedTeams.length > 0 && (
            <div>
              <h2 className="mb-3 font-pixel text-[10px] text-card-white/50">
                CLOSED ({closedTeams.length})
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {closedTeams.map(team => (
                  <TeamCard key={team.id} team={team} hackathons={hackathons} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}

function TeamCard({
  team,
  hackathons,
}: {
  team: Team;
  hackathons: Hackathon[];
}) {
  const hackathon = hackathons.find(item => item.slug === team.hackathonSlug);

  return (
    <Card className="flex flex-col">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-dunggeunmo text-base font-bold">{team.name}</h3>
        <span
          className={`px-2 py-0.5 font-pixel text-[8px] ${
            team.isOpen
              ? 'border border-accent-mint/40 bg-accent-mint/20 text-accent-mint'
              : 'border border-dark-border bg-dark-border/20 text-dark-bg/50'
          }`}
        >
          {team.isOpen ? 'RECRUITING' : 'CLOSED'}
        </span>
      </div>

      {hackathon && (
        <span className="mb-2 block font-pixel text-[8px] text-accent-purple">
          {hackathon.title}
        </span>
      )}

      <p className="mb-3 font-dunggeunmo text-sm text-dark-bg/70">{team.intro}</p>

      {team.lookingFor.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {team.lookingFor.map(role => (
            <span
              key={role}
              className="border border-accent-yellow/40 bg-accent-yellow/20 px-2 py-0.5 font-pixel text-[8px] text-accent-orange"
            >
              {role}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="font-dunggeunmo text-xs text-dark-bg/50">
          {team.memberCount}명
        </span>
        <div className="flex items-center gap-2">
          <PixelButton
            href={`/war-room/${team.id}`}
            variant="ghost"
            className="px-2 py-1 text-[8px]"
          >
            작전실 열기
          </PixelButton>
          {team.isOpen && team.contactUrl && (
            <a
              href={team.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[8px] text-accent-orange hover:underline"
            >
              연락하기
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
