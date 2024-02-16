import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Obriši profil</h2>

                <p className="mt-1 text-sm text-gray-600">
                Nakon što se vaš račun izbriše, svi njegovi resursi i podaci bit će trajno izbrisani. Prije
                     brisanjem vašeg računa, preuzmite sve podatke ili informacije koje želite zadržati.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Obriši račun</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                    Jeste li sigurni da želite izbrisati svoj račun?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                    Nakon što se vaš račun izbriše, svi njegovi resursi i podaci bit će trajno izbrisani. Molim
                         unesite svoju lozinku kako biste potvrdili da želite trajno izbrisati svoj račun.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Poništi</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Obriši račun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
