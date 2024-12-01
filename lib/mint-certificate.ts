import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import KaiaLearnNFT_ABI from "@/lib/abi/KaiaLearnNFT.json";
import { toast } from "@/hooks/use-toast";

const contractAddress = "0xdc974c5476b08fb1e182519880498119f598d57d";

export function useMintNFT() {
  // Set up the contract write function
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function mintNFT({
    title,
    description,
    score,
  }: {
    title: string;
    description: string;
    score: number;
  }) {
    try {
      writeContract({
        address: contractAddress,
        abi: KaiaLearnNFT_ABI,
        functionName: "mintCertificate",
        args: [title, description, score],
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while minting your certificate",
      });
    }
  }

  // Call useWaitForTransactionReceipt at the top level of the hook

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return { mintNFT, isPending, hash, isConfirming, isConfirmed };
}
